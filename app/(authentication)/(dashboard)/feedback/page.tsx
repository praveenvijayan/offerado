
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Submit your feedback',
};

export default function FeedbackPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Feedback</h1>
    </div>
  );
}
