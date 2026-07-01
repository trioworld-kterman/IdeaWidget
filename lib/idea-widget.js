import { jsxs as a, jsx as t, Fragment as F } from "react/jsx-runtime";
import { useState as s, useEffect as T, useCallback as B } from "react";
function j({ label: n, onClick: r }) {
  return /* @__PURE__ */ a("button", { className: "iw-button", onClick: r, "aria-label": "Open ideas panel", children: [
    "💡 ",
    n
  ] });
}
function A({ onSubmit: n, onSuccess: r, onCancel: u }) {
  const [m, p] = s(""), [w, v] = s(""), [h, l] = s(!1), [i, c] = s(null);
  async function o(f) {
    if (f.preventDefault(), !!m.trim()) {
      l(!0), c(null);
      try {
        await n({
          title: m.trim(),
          description: w.trim() || void 0
        }), p(""), v(""), r();
      } catch {
        c("Failed to submit. Please try again.");
      } finally {
        l(!1);
      }
    }
  }
  return /* @__PURE__ */ a("form", { className: "iw-form", onSubmit: o, children: [
    /* @__PURE__ */ a("div", { className: "iw-form-field", children: [
      /* @__PURE__ */ t("label", { htmlFor: "iw-title", children: "Title *" }),
      /* @__PURE__ */ t(
        "input",
        {
          id: "iw-title",
          type: "text",
          value: m,
          onChange: (f) => p(f.target.value),
          placeholder: "Your idea in one line",
          required: !0,
          maxLength: 120
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "iw-form-field", children: [
      /* @__PURE__ */ t("label", { htmlFor: "iw-desc", children: "Description" }),
      /* @__PURE__ */ t(
        "textarea",
        {
          id: "iw-desc",
          value: w,
          onChange: (f) => v(f.target.value),
          placeholder: "More details (optional)",
          rows: 3,
          maxLength: 500
        }
      )
    ] }),
    i && /* @__PURE__ */ t("p", { className: "iw-form-error", children: i }),
    /* @__PURE__ */ a("div", { className: "iw-form-actions", children: [
      /* @__PURE__ */ t("button", { className: "iw-submit-btn", type: "submit", disabled: h || !m.trim(), children: h ? "Submitting..." : "Submit idea" }),
      /* @__PURE__ */ t("button", { className: "iw-cancel-btn", type: "button", onClick: u, disabled: h, children: "Cancel" })
    ] })
  ] });
}
function V(n) {
  return n.votesUp - n.votesDown;
}
function M(n) {
  return [...n].sort((r, u) => V(u) - V(r));
}
function R(n) {
  return { open: "Open", planned: "Planned", done: "Done", declined: "Declined" }[n];
}
function q({ idea: n, userVote: r, canVote: u, isAdmin: m, onVote: p, onChangeStatus: w, onDelete: v }) {
  const [h, l] = s(!1), [i, c] = s(null), [o, f] = s(!1), [D, b] = s(!1), [k, y] = s(!1), S = r !== null;
  T(() => {
    if (!o) return;
    const N = setTimeout(() => f(!1), 3e3);
    return () => clearTimeout(N);
  }, [o]);
  async function L(N) {
    if (!(!u || S || h)) {
      l(!0), c(null);
      try {
        await p(N);
      } catch {
        c("Vote failed. Try again.");
      } finally {
        l(!1);
      }
    }
  }
  async function E(N) {
    if (w) {
      y(!0);
      try {
        await w(N);
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
  return /* @__PURE__ */ a("div", { className: "iw-item", children: [
    /* @__PURE__ */ a("div", { className: "iw-item-votes", children: [
      /* @__PURE__ */ a(
        "button",
        {
          className: `iw-vote-btn${r === "up" ? " iw-vote-btn--voted" : ""}`,
          onClick: () => L("up"),
          disabled: !u || S || h,
          "aria-label": "Vote up",
          children: [
            "▲ ",
            n.votesUp
          ]
        }
      ),
      /* @__PURE__ */ t("span", { className: "iw-net-score", children: V(n) }),
      /* @__PURE__ */ a(
        "button",
        {
          className: `iw-vote-btn${r === "down" ? " iw-vote-btn--voted" : ""}`,
          onClick: () => L("down"),
          disabled: !u || S || h,
          "aria-label": "Vote down",
          children: [
            "▼ ",
            n.votesDown
          ]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "iw-item-content", children: [
      /* @__PURE__ */ t("p", { className: "iw-item-title", children: n.title }),
      n.description && /* @__PURE__ */ t("p", { className: "iw-item-desc", children: n.description }),
      i && /* @__PURE__ */ t("p", { className: "iw-vote-error", children: i })
    ] }),
    m ? /* @__PURE__ */ a("div", { className: "iw-admin-controls", children: [
      /* @__PURE__ */ a(
        "select",
        {
          className: `iw-status-select iw-status-select--${n.status}`,
          value: n.status,
          onChange: (N) => E(N.target.value),
          disabled: k,
          "aria-label": "Change status",
          children: [
            /* @__PURE__ */ t("option", { value: "open", children: "Open" }),
            /* @__PURE__ */ t("option", { value: "planned", children: "Planned" }),
            /* @__PURE__ */ t("option", { value: "done", children: "Done" }),
            /* @__PURE__ */ t("option", { value: "declined", children: "Declined" })
          ]
        }
      ),
      o ? /* @__PURE__ */ t("button", { className: "iw-delete-confirm-btn", onClick: O, disabled: D, children: "Sure?" }) : /* @__PURE__ */ t("button", { className: "iw-delete-btn", onClick: () => f(!0), "aria-label": "Delete idea", children: "🗑" })
    ] }) : /* @__PURE__ */ t("span", { className: `iw-status-badge iw-status-badge--${n.status}`, children: R(n.status) })
  ] });
}
const K = [
  { value: "open", label: "Open" },
  { value: "planned", label: "Planned" },
  { value: "done", label: "Done" },
  { value: "declined", label: "Declined" },
  { value: "all", label: "All" }
];
function W({
  userId: n,
  isAdmin: r,
  onFetchIdeas: u,
  onVote: m,
  onFetchUserVotes: p,
  onChangeStatus: w,
  onDeleteIdea: v,
  refreshToken: h = 0
}) {
  const [l, i] = s([]), [c, o] = s({}), [f, D] = s(!0), [b, k] = s(null), [y, S] = s("open"), L = B(async () => {
    D(!0), k(null);
    try {
      const e = n && p ? p(n) : Promise.resolve({}), [d, g] = await Promise.all([u(), e]);
      i(d), o(g);
    } catch {
      k("Failed to load ideas.");
    } finally {
      D(!1);
    }
  }, [n, u, p]);
  T(() => {
    L();
  }, [L, h]);
  async function E(e, d) {
    if (!n || !m) return;
    const g = c, x = l;
    o((P) => ({ ...P, [e]: d })), i(
      (P) => P.map(
        (C) => C.id === e ? {
          ...C,
          votesUp: d === "up" ? C.votesUp + 1 : C.votesUp,
          votesDown: d === "down" ? C.votesDown + 1 : C.votesDown
        } : C
      )
    );
    try {
      await m(e, d, n);
    } catch {
      o(g), i(x);
    }
  }
  async function O(e, d) {
    w && (await w(e, d), i((g) => g.map((x) => x.id === e ? { ...x, status: d } : x)));
  }
  async function N(e) {
    v && (await v(e), i((d) => d.filter((g) => g.id !== e)));
  }
  const I = !!(n && m), U = {
    open: l.filter((e) => e.status === "open").length,
    planned: l.filter((e) => e.status === "planned").length,
    done: l.filter((e) => e.status === "done").length,
    declined: l.filter((e) => e.status === "declined").length,
    all: l.length
  }, $ = M(
    y === "all" ? l : l.filter((e) => e.status === y)
  );
  return f ? /* @__PURE__ */ t("div", { className: "iw-spinner", children: "Loading ideas..." }) : b ? /* @__PURE__ */ a("div", { className: "iw-fetch-error", children: [
    /* @__PURE__ */ t("span", { children: b }),
    /* @__PURE__ */ t("button", { className: "iw-retry-btn", onClick: L, children: "Retry" })
  ] }) : l.length === 0 ? /* @__PURE__ */ t("p", { className: "iw-empty", children: "No ideas yet. Be the first!" }) : /* @__PURE__ */ a(F, { children: [
    /* @__PURE__ */ t("div", { className: "iw-status-filters", "aria-label": "Filter ideas by status", children: K.map((e) => /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        className: `iw-status-filter${y === e.value ? " iw-status-filter--active" : ""}`,
        onClick: () => S(e.value),
        "aria-pressed": y === e.value,
        children: [
          e.label,
          " (",
          U[e.value],
          ")"
        ]
      },
      e.value
    )) }),
    $.length === 0 ? /* @__PURE__ */ t("p", { className: "iw-empty", children: y === "all" ? "No ideas to show." : `No ${y} ideas.` }) : /* @__PURE__ */ t("div", { className: "iw-list", children: $.map((e) => /* @__PURE__ */ t(
      q,
      {
        idea: e,
        userVote: c[e.id] ?? null,
        canVote: I,
        isAdmin: r,
        onVote: (d) => E(e.id, d),
        onChangeStatus: (d) => O(e.id, d),
        onDelete: () => N(e.id)
      },
      e.id
    )) })
  ] });
}
function Y({
  title: n,
  userId: r,
  isAdmin: u,
  onFetchIdeas: m,
  onSubmitIdea: p,
  onVote: w,
  onFetchUserVotes: v,
  onChangeStatus: h,
  onDeleteIdea: l,
  onClose: i
}) {
  const [c, o] = s(!1), [f, D] = s(0);
  return T(() => {
    function b(k) {
      k.key === "Escape" && i();
    }
    return window.addEventListener("keydown", b), () => window.removeEventListener("keydown", b);
  }, [i]), /* @__PURE__ */ a(F, { children: [
    /* @__PURE__ */ t("div", { className: "iw-overlay", onClick: i }),
    /* @__PURE__ */ a("div", { className: "iw-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "iw-modal-title", children: [
      /* @__PURE__ */ a("div", { className: "iw-modal-header", children: [
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ t("h2", { id: "iw-modal-title", children: n }),
          /* @__PURE__ */ t("p", { className: "iw-modal-tagline", children: "Cast your vote. Shape what's next." })
        ] }),
        /* @__PURE__ */ t(
          "button",
          {
            className: `iw-header-action${c ? " iw-header-action--active" : ""}`,
            onClick: () => o((b) => !b),
            "aria-label": c ? "Close new idea form" : "Open new idea form",
            children: c ? "Close" : "+ Idea"
          }
        ),
        /* @__PURE__ */ t("button", { className: "iw-close-btn", onClick: i, "aria-label": "Close", children: "x" })
      ] }),
      /* @__PURE__ */ a("div", { className: "iw-modal-body", children: [
        c && /* @__PURE__ */ t(
          A,
          {
            onSubmit: p,
            onSuccess: () => {
              o(!1), D((b) => b + 1);
            },
            onCancel: () => o(!1)
          }
        ),
        /* @__PURE__ */ t(
          W,
          {
            userId: r,
            isAdmin: u,
            onFetchIdeas: m,
            onVote: w,
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
  userId: n,
  isAdmin: r = !1,
  onFetchIdeas: u,
  onSubmitIdea: m,
  onVote: p,
  onFetchUserVotes: w,
  onChangeStatus: v,
  onDeleteIdea: h,
  title: l = "Feature Ideas",
  buttonLabel: i = "Ideas"
}) {
  const [c, o] = s(!1);
  return /* @__PURE__ */ a(F, { children: [
    /* @__PURE__ */ t(j, { label: i, onClick: () => o(!0) }),
    c && /* @__PURE__ */ t(
      Y,
      {
        title: l,
        userId: n,
        isAdmin: r,
        onFetchIdeas: u,
        onSubmitIdea: m,
        onVote: p,
        onFetchUserVotes: w,
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
