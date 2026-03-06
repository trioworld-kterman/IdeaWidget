import { jsxs as n, jsx as e, Fragment as F } from "react/jsx-runtime";
import { useState as s, useEffect as T, useCallback as B } from "react";
function j({ label: a, onClick: r }) {
  return /* @__PURE__ */ n("button", { className: "iw-button", onClick: r, "aria-label": "Open ideas panel", children: [
    "💡 ",
    a
  ] });
}
function A({ onSubmit: a, onSuccess: r, onCancel: u }) {
  const [m, w] = s(""), [p, v] = s(""), [h, l] = s(!1), [i, c] = s(null);
  async function o(f) {
    if (f.preventDefault(), !!m.trim()) {
      l(!0), c(null);
      try {
        await a({
          title: m.trim(),
          description: p.trim() || void 0
        }), w(""), v(""), r();
      } catch {
        c("Failed to submit. Please try again.");
      } finally {
        l(!1);
      }
    }
  }
  return /* @__PURE__ */ n("form", { className: "iw-form", onSubmit: o, children: [
    /* @__PURE__ */ n("div", { className: "iw-form-field", children: [
      /* @__PURE__ */ e("label", { htmlFor: "iw-title", children: "Title *" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "iw-title",
          type: "text",
          value: m,
          onChange: (f) => w(f.target.value),
          placeholder: "Your idea in one line",
          required: !0,
          maxLength: 120
        }
      )
    ] }),
    /* @__PURE__ */ n("div", { className: "iw-form-field", children: [
      /* @__PURE__ */ e("label", { htmlFor: "iw-desc", children: "Description" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "iw-desc",
          value: p,
          onChange: (f) => v(f.target.value),
          placeholder: "More details (optional)",
          rows: 3,
          maxLength: 500
        }
      )
    ] }),
    i && /* @__PURE__ */ e("p", { className: "iw-form-error", children: i }),
    /* @__PURE__ */ n("div", { className: "iw-form-actions", children: [
      /* @__PURE__ */ e("button", { className: "iw-submit-btn", type: "submit", disabled: h || !m.trim(), children: h ? "Submitting..." : "Submit idea" }),
      /* @__PURE__ */ e("button", { className: "iw-cancel-btn", type: "button", onClick: u, disabled: h, children: "Cancel" })
    ] })
  ] });
}
function V(a) {
  return a.votesUp - a.votesDown;
}
function M(a) {
  return [...a].sort((r, u) => V(u) - V(r));
}
function R(a) {
  return { open: "Open", planned: "Planned", done: "Done" }[a];
}
function q({ idea: a, userVote: r, canVote: u, isAdmin: m, onVote: w, onChangeStatus: p, onDelete: v }) {
  const [h, l] = s(!1), [i, c] = s(null), [o, f] = s(!1), [k, b] = s(!1), [D, y] = s(!1), S = r !== null;
  T(() => {
    if (!o) return;
    const N = setTimeout(() => f(!1), 3e3);
    return () => clearTimeout(N);
  }, [o]);
  async function L(N) {
    if (!(!u || S || h)) {
      l(!0), c(null);
      try {
        await w(N);
      } catch {
        c("Vote failed. Try again.");
      } finally {
        l(!1);
      }
    }
  }
  async function E(N) {
    if (p) {
      y(!0);
      try {
        await p(N);
      } finally {
        y(!1);
      }
    }
  }
  async function O() {
    if (v) {
      b(!0);
      try {
        await v();
      } finally {
        b(!1), f(!1);
      }
    }
  }
  return /* @__PURE__ */ n("div", { className: "iw-item", children: [
    /* @__PURE__ */ n("div", { className: "iw-item-votes", children: [
      /* @__PURE__ */ n(
        "button",
        {
          className: `iw-vote-btn${r === "up" ? " iw-vote-btn--voted" : ""}`,
          onClick: () => L("up"),
          disabled: !u || S || h,
          "aria-label": "Vote up",
          children: [
            "▲ ",
            a.votesUp
          ]
        }
      ),
      /* @__PURE__ */ e("span", { className: "iw-net-score", children: V(a) }),
      /* @__PURE__ */ n(
        "button",
        {
          className: `iw-vote-btn${r === "down" ? " iw-vote-btn--voted" : ""}`,
          onClick: () => L("down"),
          disabled: !u || S || h,
          "aria-label": "Vote down",
          children: [
            "▼ ",
            a.votesDown
          ]
        }
      )
    ] }),
    /* @__PURE__ */ n("div", { className: "iw-item-content", children: [
      /* @__PURE__ */ e("p", { className: "iw-item-title", children: a.title }),
      a.description && /* @__PURE__ */ e("p", { className: "iw-item-desc", children: a.description }),
      i && /* @__PURE__ */ e("p", { className: "iw-vote-error", children: i })
    ] }),
    m ? /* @__PURE__ */ n("div", { className: "iw-admin-controls", children: [
      /* @__PURE__ */ n(
        "select",
        {
          className: `iw-status-select iw-status-select--${a.status}`,
          value: a.status,
          onChange: (N) => E(N.target.value),
          disabled: D,
          "aria-label": "Change status",
          children: [
            /* @__PURE__ */ e("option", { value: "open", children: "Open" }),
            /* @__PURE__ */ e("option", { value: "planned", children: "Planned" }),
            /* @__PURE__ */ e("option", { value: "done", children: "Done" })
          ]
        }
      ),
      o ? /* @__PURE__ */ e("button", { className: "iw-delete-confirm-btn", onClick: O, disabled: k, children: "Sure?" }) : /* @__PURE__ */ e("button", { className: "iw-delete-btn", onClick: () => f(!0), "aria-label": "Delete idea", children: "🗑" })
    ] }) : /* @__PURE__ */ e("span", { className: `iw-status-badge iw-status-badge--${a.status}`, children: R(a.status) })
  ] });
}
const K = [
  { value: "open", label: "Open" },
  { value: "planned", label: "Planned" },
  { value: "done", label: "Done" },
  { value: "all", label: "All" }
];
function W({
  userId: a,
  isAdmin: r,
  onFetchIdeas: u,
  onVote: m,
  onFetchUserVotes: w,
  onChangeStatus: p,
  onDeleteIdea: v,
  refreshToken: h = 0
}) {
  const [l, i] = s([]), [c, o] = s({}), [f, k] = s(!0), [b, D] = s(null), [y, S] = s("open"), L = B(async () => {
    k(!0), D(null);
    try {
      const t = a && w ? w(a) : Promise.resolve({}), [d, g] = await Promise.all([u(), t]);
      i(d), o(g);
    } catch {
      D("Failed to load ideas.");
    } finally {
      k(!1);
    }
  }, [a, u, w]);
  T(() => {
    L();
  }, [L, h]);
  async function E(t, d) {
    if (!a || !m) return;
    const g = c, x = l;
    o((P) => ({ ...P, [t]: d })), i(
      (P) => P.map(
        (C) => C.id === t ? {
          ...C,
          votesUp: d === "up" ? C.votesUp + 1 : C.votesUp,
          votesDown: d === "down" ? C.votesDown + 1 : C.votesDown
        } : C
      )
    );
    try {
      await m(t, d, a);
    } catch {
      o(g), i(x);
    }
  }
  async function O(t, d) {
    p && (await p(t, d), i((g) => g.map((x) => x.id === t ? { ...x, status: d } : x)));
  }
  async function N(t) {
    v && (await v(t), i((d) => d.filter((g) => g.id !== t)));
  }
  const I = !!(a && m), U = {
    open: l.filter((t) => t.status === "open").length,
    planned: l.filter((t) => t.status === "planned").length,
    done: l.filter((t) => t.status === "done").length,
    all: l.length
  }, $ = M(
    y === "all" ? l : l.filter((t) => t.status === y)
  );
  return f ? /* @__PURE__ */ e("div", { className: "iw-spinner", children: "Loading ideas..." }) : b ? /* @__PURE__ */ n("div", { className: "iw-fetch-error", children: [
    /* @__PURE__ */ e("span", { children: b }),
    /* @__PURE__ */ e("button", { className: "iw-retry-btn", onClick: L, children: "Retry" })
  ] }) : l.length === 0 ? /* @__PURE__ */ e("p", { className: "iw-empty", children: "No ideas yet. Be the first!" }) : /* @__PURE__ */ n(F, { children: [
    /* @__PURE__ */ e("div", { className: "iw-status-filters", "aria-label": "Filter ideas by status", children: K.map((t) => /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        className: `iw-status-filter${y === t.value ? " iw-status-filter--active" : ""}`,
        onClick: () => S(t.value),
        "aria-pressed": y === t.value,
        children: [
          t.label,
          " (",
          U[t.value],
          ")"
        ]
      },
      t.value
    )) }),
    $.length === 0 ? /* @__PURE__ */ e("p", { className: "iw-empty", children: y === "all" ? "No ideas to show." : `No ${y} ideas.` }) : /* @__PURE__ */ e("div", { className: "iw-list", children: $.map((t) => /* @__PURE__ */ e(
      q,
      {
        idea: t,
        userVote: c[t.id] ?? null,
        canVote: I,
        isAdmin: r,
        onVote: (d) => E(t.id, d),
        onChangeStatus: (d) => O(t.id, d),
        onDelete: () => N(t.id)
      },
      t.id
    )) })
  ] });
}
function Y({
  title: a,
  userId: r,
  isAdmin: u,
  onFetchIdeas: m,
  onSubmitIdea: w,
  onVote: p,
  onFetchUserVotes: v,
  onChangeStatus: h,
  onDeleteIdea: l,
  onClose: i
}) {
  const [c, o] = s(!1), [f, k] = s(0);
  return T(() => {
    function b(D) {
      D.key === "Escape" && i();
    }
    return window.addEventListener("keydown", b), () => window.removeEventListener("keydown", b);
  }, [i]), /* @__PURE__ */ n(F, { children: [
    /* @__PURE__ */ e("div", { className: "iw-overlay", onClick: i }),
    /* @__PURE__ */ n("div", { className: "iw-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "iw-modal-title", children: [
      /* @__PURE__ */ n("div", { className: "iw-modal-header", children: [
        /* @__PURE__ */ n("div", { children: [
          /* @__PURE__ */ e("h2", { id: "iw-modal-title", children: a }),
          /* @__PURE__ */ e("p", { className: "iw-modal-tagline", children: "Cast your vote. Shape what's next." })
        ] }),
        /* @__PURE__ */ e(
          "button",
          {
            className: `iw-header-action${c ? " iw-header-action--active" : ""}`,
            onClick: () => o((b) => !b),
            "aria-label": c ? "Close new idea form" : "Open new idea form",
            children: c ? "Close" : "+ Idea"
          }
        ),
        /* @__PURE__ */ e("button", { className: "iw-close-btn", onClick: i, "aria-label": "Close", children: "x" })
      ] }),
      /* @__PURE__ */ n("div", { className: "iw-modal-body", children: [
        c && /* @__PURE__ */ e(
          A,
          {
            onSubmit: w,
            onSuccess: () => {
              o(!1), k((b) => b + 1);
            },
            onCancel: () => o(!1)
          }
        ),
        /* @__PURE__ */ e(
          W,
          {
            userId: r,
            isAdmin: u,
            onFetchIdeas: m,
            onVote: p,
            onFetchUserVotes: v,
            onChangeStatus: h,
            onDeleteIdea: l,
            refreshToken: f
          }
        )
      ] })
    ] })
  ] });
}
function H({
  userId: a,
  isAdmin: r = !1,
  onFetchIdeas: u,
  onSubmitIdea: m,
  onVote: w,
  onFetchUserVotes: p,
  onChangeStatus: v,
  onDeleteIdea: h,
  title: l = "Feature Ideas",
  buttonLabel: i = "Ideas"
}) {
  const [c, o] = s(!1);
  return /* @__PURE__ */ n(F, { children: [
    /* @__PURE__ */ e(j, { label: i, onClick: () => o(!0) }),
    c && /* @__PURE__ */ e(
      Y,
      {
        title: l,
        userId: a,
        isAdmin: r,
        onFetchIdeas: u,
        onSubmitIdea: m,
        onVote: w,
        onFetchUserVotes: p,
        onChangeStatus: v,
        onDeleteIdea: h,
        onClose: () => o(!1)
      }
    )
  ] });
}
export {
  H as IdeaWidget
};
