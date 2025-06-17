'use client';

import { useState, useEffect } from 'react';
import { addNote, getUserNotes, isAuthenticated, getUserData } from '@/lib/stacks';

interface Note {
  id: number;
  content: string;
  created: number;
}

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = () => {
      setIsConnected(isAuthenticated());
    };
    
    checkConnection();
    
    if (isAuthenticated()) {
      loadNotes();
    }
  }, []);

  const loadNotes = async () => {
    if (!isAuthenticated()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const userData = getUserData();
      if (userData) {
        const userNotes = await getUserNotes(userData.profile.stxAddress.testnet, 20);
        setNotes(userNotes);
      }
    } catch (err) {
      setError('Failed to load notes');
      console.error('Error loading notes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newNote.trim()) {
      setError('Please enter a note');
      return;
    }

    if (newNote.length > 200) {
      setError('Note is too long (max 200 characters)');
      return;
    }

    if (!isAuthenticated()) {
      setError('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await addNote(newNote.trim());
      setNewNote('');
      setError('');
      // Show success message
      alert('Note submitted! It will appear after the transaction is confirmed.');
      // Reload notes after a delay to allow transaction to process
      setTimeout(() => {
        loadNotes();
      }, 3000);
    } catch (err) {
      setError('Failed to add note. Please try again.');
      console.error('Error adding note:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (blockHeight: number) => {
    // Simple formatting - in a real app you'd convert block height to actual date
    return `Block #${blockHeight}`;
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">
            Connect Your Wallet
          </h2>
          <p className="text-yellow-700">
            Please connect your Hiro Wallet to start using the Notes app.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Add Note Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write your note here... (max 200 characters)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              maxLength={200}
              disabled={isSubmitting}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {newNote.length}/200 characters
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !newNote.trim()}
            className="bg-green-500 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded transition-colors"
          >
            {isSubmitting ? 'Adding Note...' : 'Add Note'}
          </button>
        </form>
      </div>

      {/* Notes List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Notes</h2>
            <button
              onClick={loadNotes}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-1 px-3 rounded text-sm transition-colors"
            >
              {isLoading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">Loading notes...</p>
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No notes yet. Add your first note above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <p className="text-gray-800 mb-2">{note.content}</p>
                  <div className="text-sm text-gray-500">
                    Note #{note.id} • {formatDate(note.created)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
