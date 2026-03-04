import { jsxs as l, jsx as e, Fragment as P } from "react/jsx-runtime";
import { useState as d, useEffect as V, useCallback as $ } from "react";
function F({ label: t, onClick: r }) {
  return /* @__PURE__ */ l("button", { className: "iw-button", onClick: r, "aria-label": "Open ideas panel", children: [
    "💡 ",
    t
  ] });
}
function T(t) {
  return t.votesUp - t.votesDown;
}
function O(t) {
  return [...t].sort((r, s) => T(s) - T(r));
}
function U(t) {
  return { open: "Open", planned: "Planned", done: "Done" }[t];
}
function B({ idea: t, userVote: r, canVote: s, isAdmin: f, onVote: h, onChangeStatus: b, onDelete: w }) {
  const [u, o] = d(!1), [c, m] = d(null), [i, v] = d(!1), [N, g] = d(!1), [C, k] = d(!1), D = r !== null;
  V(() => {
    if (!i) return;
    const n = setTimeout(() => v(!1), 3e3);
    return () => clearTimeout(n);
  }, [i]);
  async function S(n) {
    if (!(!s || D || u)) {
      o(!0), m(null);
      try {
        await h(n);
      } catch {
        m("Vote failed. Try again.");
      } finally {
        o(!1);
      }
    }
  }
  async function x(n) {
    if (b) {
      k(!0);
      try {
        await b(n);
      } finally {
        k(!1);
      }
    }
  }
  async function a() {
    if (w) {
      g(!0);
      try {
        await w();
      } finally {
        g(!1), v(!1);
      }
    }
  }
  return /* @__PURE__ */ l("div", { className: "iw-item", children: [
    /* @__PURE__ */ l("div", { className: "iw-item-votes", children: [
      /* @__PURE__ */ l(
        "button",
        {
          className: `iw-vote-btn${r === "up" ? " iw-vote-btn--voted" : ""}`,
          onClick: () => S("up"),
          disabled: !s || D || u,
          "aria-label": "Vote up",
          children: [
            "▲ ",
            t.votesUp
          ]
        }
      ),
      /* @__PURE__ */ e("span", { className: "iw-net-score", children: T(t) }),
      /* @__PURE__ */ l(
        "button",
        {
          className: `iw-vote-btn${r === "down" ? " iw-vote-btn--voted" : ""}`,
          onClick: () => S("down"),
          disabled: !s || D || u,
          "aria-label": "Vote down",
          children: [
            "▼ ",
            t.votesDown
          ]
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: "iw-item-content", children: [
      /* @__PURE__ */ e("p", { className: "iw-item-title", children: t.title }),
      t.description && /* @__PURE__ */ e("p", { className: "iw-item-desc", children: t.description }),
      c && /* @__PURE__ */ e("p", { className: "iw-vote-error", children: c })
    ] }),
    f ? /* @__PURE__ */ l("div", { className: "iw-admin-controls", children: [
      /* @__PURE__ */ l(
        "select",
        {
          className: `iw-status-select iw-status-select--${t.status}`,
          value: t.status,
          onChange: (n) => x(n.target.value),
          disabled: C,
          "aria-label": "Change status",
          children: [
            /* @__PURE__ */ e("option", { value: "open", children: "Open" }),
            /* @__PURE__ */ e("option", { value: "planned", children: "Planned" }),
            /* @__PURE__ */ e("option", { value: "done", children: "Done" })
          ]
        }
      ),
      i ? /* @__PURE__ */ e("button", { className: "iw-delete-confirm-btn", onClick: a, disabled: N, children: "Sure?" }) : /* @__PURE__ */ e("button", { className: "iw-delete-btn", onClick: () => v(!0), "aria-label": "Delete idea", children: "🗑" })
    ] }) : /* @__PURE__ */ e("span", { className: `iw-status-badge iw-status-badge--${t.status}`, children: U(t.status) })
  ] });
}
function j({ userId: t, isAdmin: r, onFetchIdeas: s, onVote: f, onFetchUserVotes: h, onChangeStatus: b, onDeleteIdea: w }) {
  const [u, o] = d([]), [c, m] = d({}), [i, v] = d(!0), [N, g] = d(null), C = $(async () => {
    v(!0), g(null);
    try {
      const a = t && h ? h(t) : Promise.resolve({}), [n, p] = await Promise.all([s(), a]);
      o(n), m(p);
    } catch {
      g("Failed to load ideas.");
    } finally {
      v(!1);
    }
  }, [t, s, h]);
  V(() => {
    C();
  }, [C]);
  async function k(a, n) {
    if (!t || !f) return;
    const p = c, L = u;
    m((E) => ({ ...E, [a]: n })), o(
      (E) => E.map(
        (y) => y.id === a ? {
          ...y,
          votesUp: n === "up" ? y.votesUp + 1 : y.votesUp,
          votesDown: n === "down" ? y.votesDown + 1 : y.votesDown
        } : y
      )
    );
    try {
      await f(a, n, t);
    } catch {
      m(p), o(L);
    }
  }
  async function D(a, n) {
    b && (await b(a, n), o((p) => p.map((L) => L.id === a ? { ...L, status: n } : L)));
  }
  async function S(a) {
    w && (await w(a), o((n) => n.filter((p) => p.id !== a)));
  }
  const x = !!(t && f);
  return i ? /* @__PURE__ */ e("div", { className: "iw-spinner", children: "Loading ideas…" }) : N ? /* @__PURE__ */ l("div", { className: "iw-fetch-error", children: [
    /* @__PURE__ */ e("span", { children: N }),
    /* @__PURE__ */ e("button", { className: "iw-retry-btn", onClick: C, children: "Retry" })
  ] }) : u.length === 0 ? /* @__PURE__ */ e("p", { className: "iw-empty", children: "No ideas yet. Be the first!" }) : /* @__PURE__ */ e("div", { className: "iw-list", children: O(u).map((a) => /* @__PURE__ */ e(
    B,
    {
      idea: a,
      userVote: c[a.id] ?? null,
      canVote: x,
      isAdmin: r,
      onVote: (n) => k(a.id, n),
      onChangeStatus: (n) => D(a.id, n),
      onDelete: () => S(a.id)
    },
    a.id
  )) });
}
function I({ onSubmit: t, onSuccess: r }) {
  const [s, f] = d(""), [h, b] = d(""), [w, u] = d(!1), [o, c] = d(null);
  async function m(i) {
    if (i.preventDefault(), !!s.trim()) {
      u(!0), c(null);
      try {
        await t({
          title: s.trim(),
          description: h.trim() || void 0
        }), r();
      } catch {
        c("Failed to submit. Please try again.");
      } finally {
        u(!1);
      }
    }
  }
  return /* @__PURE__ */ l("form", { className: "iw-form", onSubmit: m, children: [
    /* @__PURE__ */ l("div", { className: "iw-form-field", children: [
      /* @__PURE__ */ e("label", { htmlFor: "iw-title", children: "Title *" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "iw-title",
          type: "text",
          value: s,
          onChange: (i) => f(i.target.value),
          placeholder: "Your idea in one line",
          required: !0,
          maxLength: 120
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: "iw-form-field", children: [
      /* @__PURE__ */ e("label", { htmlFor: "iw-desc", children: "Description" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "iw-desc",
          value: h,
          onChange: (i) => b(i.target.value),
          placeholder: "More details (optional)",
          rows: 3,
          maxLength: 500
        }
      )
    ] }),
    o && /* @__PURE__ */ e("p", { className: "iw-form-error", children: o }),
    /* @__PURE__ */ e("button", { className: "iw-submit-btn", type: "submit", disabled: w || !s.trim(), children: w ? "Submitting…" : "Submit idea" })
  ] });
}
function M({
  title: t,
  userId: r,
  isAdmin: s,
  onFetchIdeas: f,
  onSubmitIdea: h,
  onVote: b,
  onFetchUserVotes: w,
  onChangeStatus: u,
  onDeleteIdea: o,
  onClose: c
}) {
  const [m, i] = d("list");
  return V(() => {
    function v(N) {
      N.key === "Escape" && c();
    }
    return window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v);
  }, [c]), /* @__PURE__ */ l(P, { children: [
    /* @__PURE__ */ e("div", { className: "iw-overlay", onClick: c }),
    /* @__PURE__ */ l("div", { className: "iw-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "iw-modal-title", children: [
      /* @__PURE__ */ l("div", { className: "iw-modal-header", children: [
        /* @__PURE__ */ l("div", { children: [
          /* @__PURE__ */ e("h2", { id: "iw-modal-title", children: t }),
          /* @__PURE__ */ e("p", { className: "iw-modal-tagline", children: "Cast your vote · Shape what's next" })
        ] }),
        /* @__PURE__ */ e("button", { className: "iw-close-btn", onClick: c, "aria-label": "Close", children: "✕" })
      ] }),
      /* @__PURE__ */ l("div", { className: "iw-tabs", children: [
        /* @__PURE__ */ e(
          "button",
          {
            className: `iw-tab${m === "list" ? " iw-tab--active" : ""}`,
            onClick: () => i("list"),
            children: "Ideas"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            className: `iw-tab${m === "submit" ? " iw-tab--active" : ""}`,
            onClick: () => i("submit"),
            children: "+ Submit"
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "iw-modal-body", children: m === "list" ? /* @__PURE__ */ e(
        j,
        {
          userId: r,
          isAdmin: s,
          onFetchIdeas: f,
          onVote: b,
          onFetchUserVotes: w,
          onChangeStatus: u,
          onDeleteIdea: o
        }
      ) : /* @__PURE__ */ e(
        I,
        {
          onSubmit: h,
          onSuccess: () => i("list")
        }
      ) })
    ] })
  ] });
}
function K({
  userId: t,
  isAdmin: r = !1,
  onFetchIdeas: s,
  onSubmitIdea: f,
  onVote: h,
  onFetchUserVotes: b,
  onChangeStatus: w,
  onDeleteIdea: u,
  title: o = "Feature Ideas",
  buttonLabel: c = "Ideas"
}) {
  const [m, i] = d(!1);
  return /* @__PURE__ */ l(P, { children: [
    /* @__PURE__ */ e(F, { label: c, onClick: () => i(!0) }),
    m && /* @__PURE__ */ e(
      M,
      {
        title: o,
        userId: t,
        isAdmin: r,
        onFetchIdeas: s,
        onSubmitIdea: f,
        onVote: h,
        onFetchUserVotes: b,
        onChangeStatus: w,
        onDeleteIdea: u,
        onClose: () => i(!1)
      }
    )
  ] });
}
export {
  K as IdeaWidget
};
