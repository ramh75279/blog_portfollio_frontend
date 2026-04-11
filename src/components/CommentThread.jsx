import React, { useState } from "react";
import auth from "../config/firebase";

function normEmail(e) {
  return (e || "").trim().toLowerCase();
}

function formatCommentDate(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  } catch {
    return "";
  }
}

/**
 * @param {object} props
 * @param {string} props.projectId
 * @param {Array} props.comments
 * @param {boolean} props.isLoggedIn
 * @param {string} props.commentDraft
 * @param {(value: string) => void} props.onCommentDraftChange
 * @param {() => Promise<unknown>} props.onAddComment
 * @param {(projectId: string, commentId: string, commentText: string) => Promise<unknown>} props.onUpdateComment
 * @param {(projectId: string, commentId: string) => Promise<unknown>} props.onDeleteComment
 * @param {boolean} [props.missingProject]
 */
function CommentThread({
  projectId,
  comments = [],
  isLoggedIn,
  commentDraft,
  onCommentDraftChange,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
  missingProject = false
}) {
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState("");
  const [adding, setAdding] = useState(false);
  const [savingEditId, setSavingEditId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const currentEmail = auth.currentUser?.email;

  const startEdit = (comment) => {
    setEditingId(comment._id);
    setEditDraft(comment.commentText);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft("");
  };

  const saveEdit = async (commentId) => {
    const text = editDraft.trim();
    if (!text) {
      alert("Comment cannot be empty");
      return;
    }
    setSavingEditId(commentId);
    try {
      await onUpdateComment(projectId, commentId, text);
      cancelEdit();
    } catch {
      /* parent alerts */
    } finally {
      setSavingEditId(null);
    }
  };

  const confirmDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    setDeletingId(commentId);
    try {
      await onDeleteComment(projectId, commentId);
    } catch {
      /* parent alerts */
    } finally {
      setDeletingId(null);
    }
  };

  const submitAdd = async () => {
    setAdding(true);
    try {
      await onAddComment();
    } finally {
      setAdding(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none transition-shadow";

  if (missingProject) {
    return (
      <div className="border-t pt-4 mt-4">
        <h4 className="text-xl font-bold mb-3 text-gray-900">Comments</h4>
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          Could not load this project in the database. Refresh the page or check that the server and MongoDB are
          running.
        </p>
      </div>
    );
  }

  return (
    <div className="border-t pt-4 mt-4">
      <h4 className="text-xl font-bold mb-3 text-gray-900">Comments</h4>

      {comments.length > 0 ? (
        <ul className="mb-4 space-y-3">
          {comments.map((comment) => {
            const isOwner = currentEmail && normEmail(comment.userEmail) === normEmail(currentEmail);
            const isEditing = editingId === comment._id;

            return (
              <li
                key={comment._id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <span className="font-semibold text-sm text-orange-600">{comment.userEmail}</span>
                  {comment.createdAt && (
                    <span className="text-xs text-gray-500">{formatCommentDate(comment.createdAt)}</span>
                  )}
                </div>

                {isEditing ? (
                  <div className="mt-2 space-y-2">
                    <textarea
                      value={editDraft}
                      onChange={(e) => setEditDraft(e.target.value)}
                      rows={3}
                      className={inputClass}
                    />
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={savingEditId === comment._id}
                        onClick={() => saveEdit(comment._id)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 disabled:opacity-60"
                      >
                        {savingEditId === comment._id ? "Saving…" : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-800 whitespace-pre-wrap break-words">{comment.commentText}</p>
                    {isLoggedIn && isOwner && (
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(comment)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === comment._id}
                          onClick={() => confirmDelete(comment._id)}
                          className="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-60"
                        >
                          {deletingId === comment._id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500 mb-4">No comments yet.</p>
      )}

      {isLoggedIn ? (
        <div className="space-y-3">
          <textarea
            placeholder="Write your comment…"
            value={commentDraft}
            onChange={(e) => onCommentDraftChange(e.target.value)}
            rows={4}
            className={inputClass}
          />
          <button
            type="button"
            disabled={adding}
            onClick={submitAdd}
            className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {adding ? "Posting…" : "Post comment"}
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Log in to add a comment.</p>
      )}
    </div>
  );
}

export default CommentThread;
