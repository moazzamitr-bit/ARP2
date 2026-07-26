"use client";

import { FormEvent, useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Comment = {
  id: string;
  name: string;
  message: string;
  dateLabel: string;
};

const seedComments: Comment[] = [
  {
    id: "c1",
    name: "Sara Al Mazrouei",
    message: "Clear update — helpful for retailers planning next-season assortment.",
    dateLabel: "2 days ago",
  },
  {
    id: "c2",
    name: "Omar Khan",
    message: "Would love a follow-up on category priorities for clubs and academies.",
    dateLabel: "5 days ago",
  },
];

export function ArticleComments({ articleTitle }: { articleTitle: string }) {
  const [comments, setComments] = useState<Comment[]>(seedComments);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    setError("");

    if (!name.trim() || !message.trim()) {
      setError("Please add your name and comment.");
      return;
    }
    if (message.trim().length < 8) {
      setError("Please write a slightly longer comment.");
      return;
    }

    setComments((current) => [
      {
        id: `local-${Date.now()}`,
        name: name.trim(),
        message: message.trim(),
        dateLabel: "Just now",
      },
      ...current,
    ]);
    setName("");
    setMessage("");
    setSubmitted(true);
  }

  return (
    <section className="article-comments" aria-labelledby="comments-heading">
      <div className="article-comments-head">
        <h2 id="comments-heading">
          <MessageSquare size={20} aria-hidden="true" />
          Comments
        </h2>
        <p>
          {comments.length === 1 ? "1 conversation" : `${comments.length} conversations`} on “{articleTitle}”
        </p>
      </div>

      <form className="article-comment-form" onSubmit={onSubmit} noValidate>
        <label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label>
          <span>Comment</span>
          <textarea
            name="message"
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Share a thoughtful note or question"
          />
        </label>
        {error ? (
          <p className="article-comment-error" role="alert">
            {error}
          </p>
        ) : null}
        {submitted ? (
          <p className="article-comment-success" role="status">
            Comment added locally for this demo session.
          </p>
        ) : null}
        <Button type="submit" showArrow={false}>
          <Send size={16} aria-hidden="true" />
          Post Comment
        </Button>
      </form>

      <ul className="article-comment-list">
        {comments.map((comment) => (
          <li key={comment.id}>
            <div>
              <strong>{comment.name}</strong>
              <span>{comment.dateLabel}</span>
            </div>
            <p>{comment.message}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
