// components/Pagination.js
'use client';

import React from 'react';
import Left from "@/components/icons/Left";
import Right from "@/components/icons/Right";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="flex justify-center mt-4">
            <button
                className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <Left />
            </button>
            <span className="px-3 py-1 mx-1">
                Page&nbsp;{currentPage}&nbsp;of&nbsp;{totalPages}
            </span>
            <button
                className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <Right />
            </button>
        </div>
    );
}
