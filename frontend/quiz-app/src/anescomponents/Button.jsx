import React from 'react'
import {Shuffle,} from 'lucide-react';
export default function Button({text,onclick,disabled, className}) {
  return (
    <div className="mb-8">
          <button
            onClick={onclick}
            className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors '}`}
          >
            <Shuffle size={20} />
            {text}
          </button>
        </div>
  )
}
