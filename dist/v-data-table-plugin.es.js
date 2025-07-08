import './vue-data-table.css';
import { defineComponent as j, ref as d, createElementBlock as s, openBlock as r, createElementVNode as l, createCommentVNode as i, toDisplayString as c, normalizeClass as v, withDirectives as x, vModelText as k, normalizeStyle as C, Fragment as u, renderList as f, createStaticVNode as S, vModelSelect as z } from "vue";
const N = { id: "v-data-table-container" }, L = {
  class: "mb-1",
  align: "right"
}, W = { class: "float-left" }, I = {
  key: 0,
  class: "font-semibold uppercase text-gray-600 mt-1 text-sm"
}, K = ["id"], O = { class: "w-full text-gray-600 border-collapse table-layout" }, q = ["width", "id"], G = { class: "w-full relative select-none" }, H = ["onClick", "id"], J = ["id"], P = { class: "w-full" }, Q = ["onClick"], R = ["onClick"], X = { class: "p-2 border-b-1 border-gray-300 text-xs text-left pb-4" }, Y = ["onUpdate:modelValue"], Z = ["value"], ee = ["onUpdate:modelValue"], te = {
  key: 0,
  align: "right",
  class: "mt-3"
}, le = ["onClick"], oe = { class: "v-data-table" }, se = { class: "mt-2 text-sm text-gray-700" }, re = { class: "font-light text-xs" }, ae = /* @__PURE__ */ j({
  __name: "DataTable",
  props: {
    columns: { default: () => [] },
    rows: { default: () => [] },
    column_classes: {},
    row_classes: {},
    search_classes: {},
    current_page: { default: () => 1 },
    total_pages: { default: () => 1 },
    height: { default: () => 200 },
    title: {}
  },
  emits: ["page-selected", "search", "sort-by", "show-column-filter", "apply-filter"],
  setup(g, { emit: M }) {
    const $ = d("pt-2 pr-3 pb-2 pl-3 text-xs font-semibold uppercase bg-gray-50 border-gray-300 border-1"), D = d("pt-2 pr-3 pb-2 pl-3 text-xs border-gray-300 border-1"), V = d("text-sm border-gray-300 border-1 w-70"), B = d(`vdtable-${Math.floor((/* @__PURE__ */ new Date()).getTime() * (Math.random() * 1e3))}`), _ = d(""), b = d(null), n = g, p = M;
    function E(o) {
      const t = o.target;
      p("page-selected", t.value, _.value);
    }
    function T(o) {
      return o ?? 0;
    }
    function w(o, t) {
      return t ?? o;
    }
    function U(o) {
      b.value !== null && clearTimeout(b.value), b.value = setTimeout(() => {
        const t = o.target;
        p("search", t.value);
      }, 1e3);
    }
    function m(o) {
      let t = {
        field: o.value,
        order: o.sort_order
      };
      p("sort-by", t), o.sort_order = o.sort_order === "ASC" ? "DESC" : "ASC";
    }
    function A(o) {
      if (o.show_menu)
        o.show_menu = !1;
      else {
        n.columns.forEach((e) => e.show_menu = !1);
        const t = document.getElementById(`${o.value}-label`);
        if (t) {
          let e = t.offsetLeft - t.offsetWidth - 70;
          o.style = `left: ${e > 0 ? e : 0}px;`, o.show_menu = !0, p("show-column-filter", o);
        }
      }
    }
    function F(o) {
      let t = o.filter_other ?? o.filter_value, e = {
        field: o.value,
        value: t
      };
      p("apply-filter", e);
    }
    return (o, t) => (r(), s("div", N, [
      l("div", L, [
        l("div", W, [
          n.title ? (r(), s("h3", I, c(n.title), 1)) : i("", !0)
        ]),
        l("div", {
          class: v(w(V.value, n.search_classes))
        }, [
          t[1] || (t[1] = l("span", { class: "float-left ml-2 mt-[5px]" }, [
            l("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              class: "lucide lucide-search-icon lucide-search"
            }, [
              l("path", { d: "m21 21-4.34-4.34" }),
              l("circle", {
                cx: "11",
                cy: "11",
                r: "8"
              })
            ])
          ], -1)),
          x(l("input", {
            type: "search",
            "onUpdate:modelValue": t[0] || (t[0] = (e) => _.value = e),
            onKeyup: U,
            class: "float-left p-1 pr-3 pl-3 w-[90%] outline-none",
            placeholder: "Seach here"
          }, null, 544), [
            [k, _.value]
          ]),
          t[2] || (t[2] = l("div", { style: { clear: "both" } }, null, -1))
        ], 2)
      ]),
      l("div", {
        class: "relative overflow-auto border-1 border-gray-300",
        style: C(`height:${n.height}px`),
        id: B.value
      }, [
        l("table", O, [
          l("thead", null, [
            l("tr", null, [
              (r(!0), s(u, null, f(n.columns, (e, h) => (r(), s("th", {
                class: v(w($.value, e.classes)),
                width: T(e.width),
                key: h,
                id: `${e.label}-column`
              }, [
                l("div", G, [
                  l("span", {
                    onClick: (a) => A(e),
                    id: `${e.value}-label`,
                    class: "cursor-pointer hover:text-cyan-800"
                  }, c(e.label), 9, H),
                  e.show_menu ? (r(), s("div", {
                    key: 0,
                    class: v("shadow-lg h-auto z-index-9 border-1 border-gray-200 bg-white rounded-md mt-1 w-[300px] absolute"),
                    style: C(e.style),
                    id: `${e.value}-menu`
                  }, [
                    l("ul", P, [
                      e.sortable ? (r(), s(u, { key: 0 }, [
                        e.sort_order === "ASC" ? (r(), s("li", {
                          key: 0,
                          class: "p-2 border-b-1 border-gray-300 text-xs hover:bg-gray-100 hover:cursor-pointer hover:text-cyan-800",
                          onClick: (a) => m(e)
                        }, t[3] || (t[3] = [
                          S('<span class="float-left"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-wide-narrow-icon lucide-arrow-down-wide-narrow"><path d="m3 16 4 4 4-4"></path><path d="M7 20V4"></path><path d="M11 4h10"></path><path d="M11 8h7"></path><path d="M11 12h4"></path></svg></span><span class="float-left ml-3">Sort(Ascending)</span><div style="clear:both;"></div>', 3)
                        ]), 8, Q)) : i("", !0),
                        e.sort_order === "DESC" ? (r(), s("li", {
                          key: 1,
                          class: "p-2 border-b-1 border-gray-300 text-xs hover:bg-gray-100 hover:cursor-pointer hover:text-cyan-800",
                          onClick: (a) => m(e)
                        }, t[4] || (t[4] = [
                          S('<span class="float-left"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-narrow-wide-icon lucide-arrow-up-narrow-wide"><path d="m3 8 4-4 4 4"></path><path d="M7 4v16"></path><path d="M11 12h4"></path><path d="M11 16h7"></path><path d="M11 20h10"></path></svg></span><span class="float-left ml-3">Sort(Descending)</span><div style="clear:both;"></div>', 3)
                        ]), 8, R)) : i("", !0)
                      ], 64)) : i("", !0),
                      l("li", X, [
                        t[6] || (t[6] = l("span", { class: "font-semilight text-[10px]" }, "Filter", -1)),
                        l("div", null, [
                          x(l("select", {
                            class: "w-full font-normal border-1 border-gray-300 p-1 mb-2 mt-1",
                            "onUpdate:modelValue": (a) => e.filter_value = a
                          }, [
                            (r(!0), s(u, null, f(e.filter_options, (a, y) => (r(), s("option", {
                              key: y,
                              value: a.value
                            }, c(a.label), 9, Z))), 128))
                          ], 8, Y), [
                            [z, e.filter_value]
                          ])
                        ]),
                        l("div", null, [
                          t[5] || (t[5] = l("span", { class: "font-semilight text-[10px]" }, "Other, please specify:", -1)),
                          x(l("input", {
                            "onUpdate:modelValue": (a) => e.filter_other = a,
                            type: "text",
                            class: "border-1 text-xs font-normal p-1 border-gray-300 w-full",
                            placeholder: "Enter custom value"
                          }, null, 8, ee), [
                            [k, e.filter_other]
                          ])
                        ]),
                        e.filter_value ?? e.filter_other ? (r(), s("div", te, [
                          l("button", {
                            onClick: (a) => F(e),
                            class: "p-1 border-1 border-gray-200 pl-3 pr-3 uppercase font-semibold hover:bg-gray-200 hover:cursor-pointer rounded-sm bg-gray-100 text-[10px]"
                          }, "apply", 8, le)
                        ])) : i("", !0)
                      ])
                    ])
                  ], 12, J)) : i("", !0)
                ])
              ], 10, q))), 128))
            ])
          ]),
          l("tbody", oe, [
            (r(!0), s(u, null, f(n.rows, (e, h) => (r(), s("tr", { key: h }, [
              (r(!0), s(u, null, f(n.columns, (a, y) => (r(), s("td", {
                class: v(w(D.value, e.classes)),
                key: y
              }, c(e[a.value]), 3))), 128))
            ]))), 128))
          ])
        ])
      ], 12, K),
      l("div", se, [
        l("select", {
          onChange: E,
          class: "pt-1 pb-1 pl-3 text-xs font-semibold text-gray-600 border-gray-300 lowecase border-1"
        }, [
          (r(!0), s(u, null, f(n.total_pages, (e, h) => (r(), s("option", { key: h }, c(e), 1))), 128))
        ], 32),
        l("span", re, " / " + c(o.total_pages) + " pages", 1)
      ])
    ]));
  }
}), de = {
  install(g) {
    g.component("DataTable", ae);
  }
};
export {
  ae as DataTable,
  de as default
};
