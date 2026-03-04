import { jsxs as a, jsx as t, Fragment as k } from "react/jsx-runtime";
import { useState as d, useCallback as x, useEffect as C } from "react";
function E({ label: e, onClick: n }) {
  return /* @__PURE__ */ a("button", { className: "iw-button", onClick: n, "aria-label": "Open ideas panel", children: [
    "💡 ",
    e
  ] });
}
function g(e) {
  return e.votesUp - e.votesDown;
}
function I(e) {
  return [...e].sort((n, i) => g(i) - g(n));
}
function P(e) {
  return { open: "Open", planned: "Planned", done: "Done" }[e];
}
function T({ idea: e, userVote: n, canVote: i, onVote: u }) {
  const [o, c] = d(!1), [l, s] = d(null), r = n !== null;
  async function m(h) {
    if (!(!i || r || o)) {
      c(!0), s(null);
      try {
        await u(h);
      } catch {
        s("Vote failed. Try again.");
      } finally {
        c(!1);
      }
    }
  }
  return /* @__PURE__ */ a("div", { className: "iw-item", children: [
    /* @__PURE__ */ a("div", { className: "iw-item-votes", children: [
      /* @__PURE__ */ a(
        "button",
        {
          className: `iw-vote-btn${n === "up" ? " iw-vote-btn--voted" : ""}`,
          onClick: () => m("up"),
          disabled: !i || r || o,
          "aria-label": "Vote up",
          children: [
            "▲ ",
            e.votesUp
          ]
        }
      ),
      /* @__PURE__ */ t("span", { className: "iw-net-score", children: g(e) }),
      /* @__PURE__ */ a(
        "button",
        {
          className: `iw-vote-btn${n === "down" ? " iw-vote-btn--voted" : ""}`,
          onClick: () => m("down"),
          disabled: !i || r || o,
          "aria-label": "Vote down",
          children: [
            "▼ ",
            e.votesDown
          ]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "iw-item-content", children: [
      /* @__PURE__ */ t("p", { className: "iw-item-title", children: e.title }),
      e.description && /* @__PURE__ */ t("p", { className: "iw-item-desc", children: e.description }),
      l && /* @__PURE__ */ t("p", { className: "iw-vote-error", children: l })
    ] }),
    /* @__PURE__ */ t("span", { className: `iw-status-badge iw-status-badge--${e.status}`, children: P(e.status) })
  ] });
}
function V({ userId: e, onFetchIdeas: n, onVote: i, onFetchUserVotes: u }) {
  const [o, c] = d([]), [l, s] = d({}), [r, m] = d(!0), [h, b] = d(null), f = x(async () => {
    m(!0), b(null);
    try {
      const w = e && u ? u(e) : Promise.resolve({}), [v, N] = await Promise.all([n(), w]);
      c(v), s(N);
    } catch {
      b("Failed to load ideas.");
    } finally {
      m(!1);
    }
  }, [e, n, u]);
  C(() => {
    f();
  }, [f]);
  async function S(w, v) {
    if (!e || !i) return;
    const N = l, D = o;
    s((y) => ({ ...y, [w]: v })), c(
      (y) => y.map(
        (p) => p.id === w ? {
          ...p,
          votesUp: v === "up" ? p.votesUp + 1 : p.votesUp,
          votesDown: v === "down" ? p.votesDown + 1 : p.votesDown
        } : p
      )
    );
    try {
      await i(w, v, e);
    } catch {
      s(N), c(D);
    }
  }
  const L = !!(e && i);
  return r ? /* @__PURE__ */ t("div", { className: "iw-spinner", children: "Loading ideas…" }) : h ? /* @__PURE__ */ a("div", { className: "iw-fetch-error", children: [
    /* @__PURE__ */ t("span", { children: h }),
    /* @__PURE__ */ t("button", { className: "iw-retry-btn", onClick: f, children: "Retry" })
  ] }) : o.length === 0 ? /* @__PURE__ */ t("p", { className: "iw-empty", children: "No ideas yet. Be the first!" }) : /* @__PURE__ */ t("div", { className: "iw-list", children: I(o).map((w) => /* @__PURE__ */ t(
    T,
    {
      idea: w,
      userVote: l[w.id] ?? null,
      canVote: L,
      onVote: (v) => S(w.id, v)
    },
    w.id
  )) });
}
function $({ onSubmit: e, onSuccess: n }) {
  const [i, u] = d(""), [o, c] = d(""), [l, s] = d(!1), [r, m] = d(null);
  async function h(b) {
    if (b.preventDefault(), !!i.trim()) {
      s(!0), m(null);
      try {
        await e({
          title: i.trim(),
          description: o.trim() || void 0
        }), n();
      } catch {
        m("Failed to submit. Please try again.");
      } finally {
        s(!1);
      }
    }
  }
  return /* @__PURE__ */ a("form", { className: "iw-form", onSubmit: h, children: [
    /* @__PURE__ */ a("div", { className: "iw-form-field", children: [
      /* @__PURE__ */ t("label", { htmlFor: "iw-title", children: "Title *" }),
      /* @__PURE__ */ t(
        "input",
        {
          id: "iw-title",
          type: "text",
          value: i,
          onChange: (b) => u(b.target.value),
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
          value: o,
          onChange: (b) => c(b.target.value),
          placeholder: "More details (optional)",
          rows: 3,
          maxLength: 500
        }
      )
    ] }),
    r && /* @__PURE__ */ t("p", { className: "iw-form-error", children: r }),
    /* @__PURE__ */ t("button", { className: "iw-submit-btn", type: "submit", disabled: l || !i.trim(), children: l ? "Submitting…" : "Submit idea" })
  ] });
}
function F({
  title: e,
  userId: n,
  onFetchIdeas: i,
  onSubmitIdea: u,
  onVote: o,
  onFetchUserVotes: c,
  onClose: l
}) {
  const [s, r] = d("list");
  return C(() => {
    function m(h) {
      h.key === "Escape" && l();
    }
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [l]), /* @__PURE__ */ a(k, { children: [
    /* @__PURE__ */ t("div", { className: "iw-overlay", onClick: l }),
    /* @__PURE__ */ a("div", { className: "iw-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "iw-modal-title", children: [
      /* @__PURE__ */ a("div", { className: "iw-modal-header", children: [
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ t("h2", { id: "iw-modal-title", children: e }),
          /* @__PURE__ */ t("p", { className: "iw-modal-tagline", children: "Cast your vote · Shape what's next" })
        ] }),
        /* @__PURE__ */ t("button", { className: "iw-close-btn", onClick: l, "aria-label": "Close", children: "✕" })
      ] }),
      /* @__PURE__ */ a("div", { className: "iw-tabs", children: [
        /* @__PURE__ */ t(
          "button",
          {
            className: `iw-tab${s === "list" ? " iw-tab--active" : ""}`,
            onClick: () => r("list"),
            children: "Ideas"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            className: `iw-tab${s === "submit" ? " iw-tab--active" : ""}`,
            onClick: () => r("submit"),
            children: "+ Submit"
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "iw-modal-body", children: s === "list" ? /* @__PURE__ */ t(
        V,
        {
          userId: n,
          onFetchIdeas: i,
          onVote: o,
          onFetchUserVotes: c
        }
      ) : /* @__PURE__ */ t(
        $,
        {
          onSubmit: u,
          onSuccess: () => r("list")
        }
      ) })
    ] })
  ] });
}
function O({
  userId: e,
  onFetchIdeas: n,
  onSubmitIdea: i,
  onVote: u,
  onFetchUserVotes: o,
  title: c = "Feature Ideas",
  buttonLabel: l = "Ideas"
}) {
  const [s, r] = d(!1);
  return /* @__PURE__ */ a(k, { children: [
    /* @__PURE__ */ t(E, { label: l, onClick: () => r(!0) }),
    s && /* @__PURE__ */ t(
      F,
      {
        title: c,
        userId: e,
        onFetchIdeas: n,
        onSubmitIdea: i,
        onVote: u,
        onFetchUserVotes: o,
        onClose: () => r(!1)
      }
    )
  ] });
}
export {
  O as IdeaWidget
};
