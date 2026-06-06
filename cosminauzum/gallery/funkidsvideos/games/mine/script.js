var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.38.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/App.svelte generated by Svelte v3.38.2 */

    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
      const child_ctx = ctx.slice();
      child_ctx[3] = list[i];
      child_ctx[9] = i;
      return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
      const child_ctx = ctx.slice();
      child_ctx[10] = list[i];
      child_ctx[12] = i;
      return child_ctx;
    }

    // (121:0) {#if gameover}
    function create_if_block_2(ctx) {
      let h1;

      const block = {
        c: function create() {
          h1 = element("h1");
          h1.textContent = "Game over";
          add_location(h1, file, 121, 0, 2353);
        },
        m: function mount(target, anchor) {
          insert_dev(target, h1, anchor);
        },
        d: function destroy(detaching) {
          if (detaching) detach_dev(h1);
        }
      };

      dispatch_dev("SvelteRegisterBlock", {
        block,
        id: create_if_block_2.name,
        type: "if",
        source: "(121:0) {#if gameover}",
        ctx
      });

      return block;
    }

    // (135:12) {:else}
    function create_else_block(ctx) {
      let div;
      let mounted;
      let dispose;

      function click_handler() {
        return /*click_handler*/ ctx[4](/*i*/ ctx[9], /*j*/ ctx[12]);
      }

      const block = {
        c: function create() {
          div = element("div");
          attr_dev(div, "class", "svelte-e8erxb");
          add_location(div, file, 135, 16, 2732);
        },
        m: function mount(target, anchor) {
          insert_dev(target, div, anchor);

          if (!mounted) {
            dispose = listen_dev(div, "click", click_handler, false, false, false);
            mounted = true;
          }
        },
        p: function update(new_ctx, dirty) {
          ctx = new_ctx;
        },
        d: function destroy(detaching) {
          if (detaching) detach_dev(div);
          mounted = false;
          dispose();
        }
      };

      dispatch_dev("SvelteRegisterBlock", {
        block,
        id: create_else_block.name,
        type: "else",
        source: "(135:12) {:else}",
        ctx
      });

      return block;
    }

    // (129:12) {#if box.revealed}
    function create_if_block(ctx) {
      let div;
      let t;
      let if_block = /*box*/ ctx[10].distance > 0 && create_if_block_1(ctx);

      const block = {
        c: function create() {
          div = element("div");
          if (if_block) if_block.c();
          t = space();
          attr_dev(div, "class", "svelte-e8erxb");
          toggle_class(div, "bomb", /*box*/ ctx[10].bomb);
          toggle_class(div, "revealed", /*box*/ ctx[10].revealed);
          add_location(div, file, 129, 16, 2506);
        },
        m: function mount(target, anchor) {
          insert_dev(target, div, anchor);
          if (if_block) if_block.m(div, null);
          append_dev(div, t);
        },
        p: function update(ctx, dirty) {
          if (/*box*/ ctx[10].distance > 0) {
            if (if_block) {
              if_block.p(ctx, dirty);
            } else {
              if_block = create_if_block_1(ctx);
              if_block.c();
              if_block.m(div, t);
            }
          } else if (if_block) {
            if_block.d(1);
            if_block = null;
          }

          if (dirty & /*grid*/ 1) {
            toggle_class(div, "bomb", /*box*/ ctx[10].bomb);
          }

          if (dirty & /*grid*/ 1) {
            toggle_class(div, "revealed", /*box*/ ctx[10].revealed);
          }
        },
        d: function destroy(detaching) {
          if (detaching) detach_dev(div);
          if (if_block) if_block.d();
        }
      };

      dispatch_dev("SvelteRegisterBlock", {
        block,
        id: create_if_block.name,
        type: "if",
        source: "(129:12) {#if box.revealed}",
        ctx
      });

      return block;
    }

    // (131:20) {#if box.distance > 0}
    function create_if_block_1(ctx) {
      let t_value = /*box*/ ctx[10].distance + "";
      let t;

      const block = {
        c: function create() {
          t = text(t_value);
        },
        m: function mount(target, anchor) {
          insert_dev(target, t, anchor);
        },
        p: function update(ctx, dirty) {
          if (dirty & /*grid*/ 1 && t_value !== (t_value = /*box*/ ctx[10].distance + "")) set_data_dev(t, t_value);
        },
        d: function destroy(detaching) {
          if (detaching) detach_dev(t);
        }
      };

      dispatch_dev("SvelteRegisterBlock", {
        block,
        id: create_if_block_1.name,
        type: "if",
        source: "(131:20) {#if box.distance > 0}",
        ctx
      });

      return block;
    }

    // (128:8) {#each row as box,j}
    function create_each_block_1(ctx) {
      let if_block_anchor;

      function select_block_type(ctx, dirty) {
        if (/*box*/ ctx[10].revealed) return create_if_block;
        return create_else_block;
      }

      let current_block_type = select_block_type(ctx);
      let if_block = current_block_type(ctx);

      const block = {
        c: function create() {
          if_block.c();
          if_block_anchor = empty();
        },
        m: function mount(target, anchor) {
          if_block.m(target, anchor);
          insert_dev(target, if_block_anchor, anchor);
        },
        p: function update(ctx, dirty) {
          if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
            if_block.p(ctx, dirty);
          } else {
            if_block.d(1);
            if_block = current_block_type(ctx);

            if (if_block) {
              if_block.c();
              if_block.m(if_block_anchor.parentNode, if_block_anchor);
            }
          }
        },
        d: function destroy(detaching) {
          if_block.d(detaching);
          if (detaching) detach_dev(if_block_anchor);
        }
      };

      dispatch_dev("SvelteRegisterBlock", {
        block,
        id: create_each_block_1.name,
        type: "each",
        source: "(128:8) {#each row as box,j}",
        ctx
      });

      return block;
    }

    // (127:4) {#each grid as row,i}
    function create_each_block(ctx) {
      let each_1_anchor;
      let each_value_1 = /*row*/ ctx[3];
      validate_each_argument(each_value_1);
      let each_blocks = [];

      for (let i = 0; i < each_value_1.length; i += 1) {
        each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
      }

      const block = {
        c: function create() {
          for (let i = 0; i < each_blocks.length; i += 1) {
            each_blocks[i].c();
          }

          each_1_anchor = empty();
        },
        m: function mount(target, anchor) {
          for (let i = 0; i < each_blocks.length; i += 1) {
            each_blocks[i].m(target, anchor);
          }

          insert_dev(target, each_1_anchor, anchor);
        },
        p: function update(ctx, dirty) {
          if (dirty & /*grid, revealBox*/ 5) {
            each_value_1 = /*row*/ ctx[3];
            validate_each_argument(each_value_1);
            let i;

            for (i = 0; i < each_value_1.length; i += 1) {
              const child_ctx = get_each_context_1(ctx, each_value_1, i);

              if (each_blocks[i]) {
                each_blocks[i].p(child_ctx, dirty);
              } else {
                each_blocks[i] = create_each_block_1(child_ctx);
                each_blocks[i].c();
                each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
              }
            }

            for (; i < each_blocks.length; i += 1) {
              each_blocks[i].d(1);
            }

            each_blocks.length = each_value_1.length;
          }
        },
        d: function destroy(detaching) {
          destroy_each(each_blocks, detaching);
          if (detaching) detach_dev(each_1_anchor);
        }
      };

      dispatch_dev("SvelteRegisterBlock", {
        block,
        id: create_each_block.name,
        type: "each",
        source: "(127:4) {#each grid as row,i}",
        ctx
      });

      return block;
    }

    function create_fragment(ctx) {
      let t;
      let div;
      let if_block = /*gameover*/ ctx[1] && create_if_block_2(ctx);
      let each_value = /*grid*/ ctx[0];
      validate_each_argument(each_value);
      let each_blocks = [];

      for (let i = 0; i < each_value.length; i += 1) {
        each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
      }

      const block = {
        c: function create() {
          if (if_block) if_block.c();
          t = space();
          div = element("div");

          for (let i = 0; i < each_blocks.length; i += 1) {
            each_blocks[i].c();
          }

          attr_dev(div, "class", "game svelte-e8erxb");
          add_location(div, file, 125, 0, 2383);
        },
        l: function claim(nodes) {
          throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
        },
        m: function mount(target, anchor) {
          if (if_block) if_block.m(target, anchor);
          insert_dev(target, t, anchor);
          insert_dev(target, div, anchor);

          for (let i = 0; i < each_blocks.length; i += 1) {
            each_blocks[i].m(div, null);
          }
        },
        p: function update(ctx, [dirty]) {
          if (/*gameover*/ ctx[1]) {
            if (if_block) ; else {
              if_block = create_if_block_2(ctx);
              if_block.c();
              if_block.m(t.parentNode, t);
            }
          } else if (if_block) {
            if_block.d(1);
            if_block = null;
          }

          if (dirty & /*grid, revealBox*/ 5) {
            each_value = /*grid*/ ctx[0];
            validate_each_argument(each_value);
            let i;

            for (i = 0; i < each_value.length; i += 1) {
              const child_ctx = get_each_context(ctx, each_value, i);

              if (each_blocks[i]) {
                each_blocks[i].p(child_ctx, dirty);
              } else {
                each_blocks[i] = create_each_block(child_ctx);
                each_blocks[i].c();
                each_blocks[i].m(div, null);
              }
            }

            for (; i < each_blocks.length; i += 1) {
              each_blocks[i].d(1);
            }

            each_blocks.length = each_value.length;
          }
        },
        i: noop,
        o: noop,
        d: function destroy(detaching) {
          if (if_block) if_block.d(detaching);
          if (detaching) detach_dev(t);
          if (detaching) detach_dev(div);
          destroy_each(each_blocks, detaching);
        }
      };

      dispatch_dev("SvelteRegisterBlock", {
        block,
        id: create_fragment.name,
        type: "component",
        source: "",
        ctx
      });

      return block;
    }

    function instance($$self, $$props, $$invalidate) {
      let { $$slots: slots = {}, $$scope } = $$props;
      validate_slots("App", slots, []);
      let grid = [];
      var row = 10;
      let col = 10;
      let bombs = 10;
      let gameover = false;

      for (let i = 0; i < row; i++) {
        grid[i] = new Array(col);

        for (let j = 0; j < col; j++) {
          grid[i][j] = {
            bomb: false,
            revealed: false,
            distance: 0
          };
        }
      }

      for (let i = 0; i < bombs; i++) {
        let x = Math.floor(Math.random() * row);
        let y = Math.floor(Math.random() * col);

        if (grid[x][y].bomb) {
          i--;
          continue;
        }

        grid[x][y].bomb = true;
      }

      function countDistance(i, j) {
        if (grid[i][j].bomb) {
          $$invalidate(0, grid[i][j].distance = -1, grid);
          return;
        }

        let count = 0;

        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            try {
              if (grid[x + i][y + j].bomb) {
                count++;
              }
            } catch(msg) {
              
            }
          }
        }

        $$invalidate(0, grid[i][j].distance = count, grid);
      }

      for (let i = 0; i < row; i++) {
        for (let j = 0; j < row; j++) {
          countDistance(i, j);
        }
      }

      function revealBox(i, j) {
        $$invalidate(0, grid[i][j].revealed = true, grid);

        if (grid[i][j].bomb) {
          $$invalidate(1, gameover = true);

          for (let i = 0; i < row; i++) {
            for (let j = 0; j < row; j++) {
              if (grid[i][j].bomb) {
                $$invalidate(0, grid[i][j].revealed = true, grid);
              }
            }
          }
        }

        if (grid[i][j].distance == 0) {
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              try {
                if (!grid[x + i][y + j].bomb && !grid[x + i][y + j].revealed) {
                  revealBox(x + i, y + j);
                }
              } catch(msg) {
                
              }
            }
          }
        }
      }

      const writable_props = [];

      Object.keys($$props).forEach(key => {
        if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
      });

      const click_handler = (i, j) => revealBox(i, j);

      $$self.$capture_state = () => ({
        grid,
        row,
        col,
        bombs,
        gameover,
        countDistance,
        revealBox
      });

      $$self.$inject_state = $$props => {
        if ("grid" in $$props) $$invalidate(0, grid = $$props.grid);
        if ("row" in $$props) $$invalidate(3, row = $$props.row);
        if ("col" in $$props) col = $$props.col;
        if ("bombs" in $$props) bombs = $$props.bombs;
        if ("gameover" in $$props) $$invalidate(1, gameover = $$props.gameover);
      };

      if ($$props && "$$inject" in $$props) {
        $$self.$inject_state($$props.$$inject);
      }

      return [grid, gameover, revealBox, row, click_handler];
    }

    class App extends SvelteComponentDev {
      constructor(options) {
        super(options);
        init(this, options, instance, create_fragment, safe_not_equal, {});

        dispatch_dev("SvelteRegisterComponent", {
          component: this,
          tagName: "App",
          options,
          id: create_fragment.name
        });
      }
    }

    const app = new App({
      target: document.body,
      props: {
        name: 'world'
      }
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map