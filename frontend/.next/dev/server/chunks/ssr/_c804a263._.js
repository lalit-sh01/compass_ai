module.exports = [
"[project]/lib/progress/tracker.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateProgress",
    ()=>calculateProgress,
    "generateItemId",
    ()=>generateItemId,
    "parseItemId",
    ()=>parseItemId
]);
function generateItemId(weekNumber, type, index, section, parentIndex) {
    if (type === 'subtask' && parentIndex !== undefined) {
        return `w${weekNumber}-t${parentIndex}-s${index}`;
    }
    if (type === 'resource') {
        // section can be used for topic ID or general section
        const sectionSuffix = section ? `-${section}` : '';
        return `w${weekNumber}-r${index}${sectionSuffix}`;
    }
    const prefix = type === 'deliverable' ? 'd' : 't';
    const sectionSuffix = section ? `-${section}` : '';
    return `w${weekNumber}-${prefix}${index}${sectionSuffix}`;
}
function parseItemId(itemId) {
    // Format: w1-d1-build, w1-t1, w1-t1-s1
    const parts = itemId.split('-');
    const weekNumber = parseInt(parts[0].substring(1));
    if (parts.length >= 3 && parts[1].startsWith('t') && parts[2].startsWith('s')) {
        // Subtask: w1-t1-s1
        const parentIndex = parseInt(parts[1].substring(1));
        const index = parseInt(parts[2].substring(1));
        return {
            weekNumber,
            type: 'subtask',
            index,
            parentIndex
        };
    }
    // Resource: w1-r0-topic-0 or w1-r0-research
    if (parts[1].startsWith('r')) {
        const index = parseInt(parts[1].substring(1));
        const sectionPart = parts.slice(2).join('-'); // topic-0 or research
        let topicIndex;
        if (sectionPart.startsWith('topic-')) {
            topicIndex = parseInt(sectionPart.split('-')[1]);
        }
        return {
            weekNumber,
            type: 'resource',
            index,
            section: sectionPart,
            topicIndex
        };
    }
    const typeChar = parts[1].charAt(0);
    const index = parseInt(parts[1].substring(1));
    const type = typeChar === 'd' ? 'deliverable' : 'topic';
    let section;
    if (parts.length > 2 && !parts[2].startsWith('s')) {
        section = parts[2];
    }
    return {
        weekNumber,
        type,
        index,
        section
    };
}
function calculateProgress(total, completed) {
    if (total === 0) return 0;
    return Math.round(completed / total * 100);
}
}),
"[project]/components/viewer/actions/RemoveButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RemoveButton",
    ()=>RemoveButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
'use client';
;
;
;
function RemoveButton({ onRemove, itemName, disabled = false, className = "", iconSize = 14 }) {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const dialogRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [
        isOpen
    ]);
    const handleConfirm = (e)=>{
        e.stopPropagation();
        onRemove();
        setIsOpen(false);
    };
    const handleCancel = (e)=>{
        e.stopPropagation();
        setIsOpen(false);
    };
    const handleTrigger = (e)=>{
        e.stopPropagation();
        if (!disabled) {
            setIsOpen(true);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative inline-block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleTrigger,
                disabled: disabled,
                className: `p-1 text-text-tertiary hover:text-red-600 rounded-sm hover:bg-red-50 transition-colors ${className}`,
                title: `Remove ${itemName}`,
                "aria-label": `Remove ${itemName}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                    size: iconSize
                }, void 0, false, {
                    fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                    lineNumber: 67,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 top-full mt-2 z-50 min-w-[280px] bg-surface rounded-md shadow-lg border border-border p-[var(--space-4)] animate-in fade-in zoom-in-95 duration-200 origin-top-right",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: dialogRef,
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2 bg-red-100 rounded-full shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                        className: "w-4 h-4 text-red-600"
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                                        lineNumber: 75,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                                    lineNumber: 74,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-sm font-semibold text-text-primary",
                                            children: "Remove Item?"
                                        }, void 0, false, {
                                            fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                                            lineNumber: 78,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-text-secondary mt-1",
                                            children: [
                                                "Are you sure you want to remove this ",
                                                itemName,
                                                "? This action cannot be undone."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                                            lineNumber: 81,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                                    lineNumber: 77,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                            lineNumber: 73,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end gap-2 mt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleCancel,
                                    className: "px-3 py-1.5 text-xs font-medium text-text-secondary bg-transparent hover:bg-bg-secondary rounded-sm transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                                    lineNumber: 88,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleConfirm,
                                    className: "px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-sm transition-colors flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                                            lineNumber: 98,
                                            columnNumber: 33
                                        }, this),
                                        "Remove"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                                    lineNumber: 94,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                            lineNumber: 87,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                    lineNumber: 72,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                lineNumber: 71,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
        lineNumber: 59,
        columnNumber: 9
    }, this);
}
}),
"[project]/context/SelectionContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectionProvider",
    ()=>SelectionProvider,
    "useSelection",
    ()=>useSelection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const SelectionContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function SelectionProvider({ children }) {
    const [selectedIds, setSelectedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [isSelectionMode, setIsSelectionMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const toggleSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setSelectedIds((prev)=>{
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    }, []);
    const clearSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setSelectedIds(new Set());
        setIsSelectionMode(false);
    }, []);
    const selectAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((ids)=>{
        setSelectedIds(new Set(ids));
    }, []);
    const isSelected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        return selectedIds.has(id);
    }, [
        selectedIds
    ]);
    const toggleSelectionMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsSelectionMode((prev)=>{
            if (prev) {
                // Exiting selection mode, clear selection
                setSelectedIds(new Set());
            }
            return !prev;
        });
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectionContext.Provider, {
        value: {
            selectedIds,
            toggleSelection,
            clearSelection,
            selectAll,
            isSelected,
            hasSelection: selectedIds.size > 0,
            selectionCount: selectedIds.size,
            isSelectionMode: isSelectionMode || selectedIds.size > 0,
            toggleSelectionMode
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/SelectionContext.tsx",
        lineNumber: 59,
        columnNumber: 9
    }, this);
}
function useSelection() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(SelectionContext);
    if (context === undefined) {
        throw new Error('useSelection must be used within a SelectionProvider');
    }
    return context;
}
}),
"[project]/lib/notes/note-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Utility functions for note operations
 */ __turbopack_context__.s([
    "exceedsMaxLength",
    ()=>exceedsMaxLength,
    "formatTimestamp",
    ()=>formatTimestamp,
    "getCharacterCount",
    ()=>getCharacterCount,
    "isNoteEmpty",
    ()=>isNoteEmpty,
    "sanitizeMarkdown",
    ()=>sanitizeMarkdown,
    "truncateNote",
    ()=>truncateNote
]);
function formatTimestamp(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
}
function truncateNote(content, maxLength = 100) {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
}
function sanitizeMarkdown(content) {
    // Remove script tags and event handlers
    let sanitized = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
    return sanitized;
}
function isNoteEmpty(content) {
    return !content || content.trim().length === 0;
}
function getCharacterCount(content) {
    return content.length;
}
function exceedsMaxLength(content, maxLength) {
    return content.length > maxLength;
}
}),
"[project]/components/viewer/notes/NoteIcon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoteIcon",
    ()=>NoteIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notes$2f$note$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/notes/note-utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function NoteIcon({ content, onClick, className = '' }) {
    const hasNote = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notes$2f$note$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNoteEmpty"])(content);
    if (!hasNote && !onClick) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClick,
                className: `p-1 rounded transition-colors ${hasNote ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20' : 'text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'} ${className}`,
                title: hasNote ? 'View note' : 'Add note',
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/components/viewer/notes/NoteIcon.tsx",
                    lineNumber: 29,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/notes/NoteIcon.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this),
            hasNote && content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 top-full mt-1 hidden group-hover:block z-10 w-64 p-2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded shadow-lg",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notes$2f$note$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncateNote"])(content, 150)
            }, void 0, false, {
                fileName: "[project]/components/viewer/notes/NoteIcon.tsx",
                lineNumber: 34,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/notes/NoteIcon.tsx",
        lineNumber: 20,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/viewer/notes/NoteEditor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoteEditor",
    ()=>NoteEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notes$2f$note$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/notes/note-utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function NoteEditor({ entityType, entityId, initialContent = '', onSave, onCancel, placeholder = 'Add your notes here... (Markdown supported)', maxLength = 2000, autoFocus = false }) {
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialContent);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastSaved, setLastSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hasChanges, setHasChanges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const autoSaveTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const characterCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notes$2f$note$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCharacterCount"])(content);
    const isOverLimit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notes$2f$note$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exceedsMaxLength"])(content, maxLength);
    // Auto-focus if requested
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (autoFocus && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [
        autoFocus
    ]);
    // Auto-save logic
    const performSave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!hasChanges || isSaving || isOverLimit) return;
        setIsSaving(true);
        try {
            await onSave(content);
            setLastSaved(new Date().toISOString());
            setHasChanges(false);
        } catch (error) {
            console.error('Failed to save note:', error);
        } finally{
            setIsSaving(false);
        }
    }, [
        content,
        hasChanges,
        isSaving,
        isOverLimit,
        onSave
    ]);
    // Set up auto-save timer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (hasChanges && !isSaving) {
            // Clear existing timer
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }
            // Set new timer for 3 seconds
            autoSaveTimerRef.current = setTimeout(()=>{
                performSave();
            }, 3000);
        }
        return ()=>{
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }
        };
    }, [
        hasChanges,
        isSaving,
        performSave
    ]);
    const handleContentChange = (e)=>{
        setContent(e.target.value);
        setHasChanges(true);
    };
    const handleManualSave = async ()=>{
        if (autoSaveTimerRef.current) {
            clearTimeout(autoSaveTimerRef.current);
        }
        await performSave();
    };
    const handleCancel = ()=>{
        if (autoSaveTimerRef.current) {
            clearTimeout(autoSaveTimerRef.current);
        }
        setContent(initialContent);
        setHasChanges(false);
        onCancel?.();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                lineNumber: 109,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: "Note"
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                lineNumber: 110,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                        lineNumber: 108,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500",
                        children: [
                            lastSaved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                        lineNumber: 115,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Saved ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notes$2f$note$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTimestamp"])(lastSaved)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                        lineNumber: 116,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                lineNumber: 114,
                                columnNumber: 25
                            }, this),
                            isSaving && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-blue-600 dark:text-blue-400",
                                children: "Saving..."
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                lineNumber: 119,
                                columnNumber: 34
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                        lineNumber: 112,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                ref: textareaRef,
                value: content,
                onChange: handleContentChange,
                placeholder: placeholder,
                className: "w-full min-h-[120px] p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-y",
                maxLength: maxLength
            }, void 0, false, {
                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                lineNumber: 124,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mt-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-500 dark:text-gray-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: isOverLimit ? 'text-red-600 dark:text-red-400 font-medium' : '',
                                children: [
                                    characterCount,
                                    " / ",
                                    maxLength
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                lineNumber: 136,
                                columnNumber: 21
                            }, this),
                            isOverLimit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2 text-red-600 dark:text-red-400",
                                children: "Character limit exceeded"
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                lineNumber: 139,
                                columnNumber: 37
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                        lineNumber: 135,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            onCancel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleCancel,
                                className: "px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-4 h-4 inline mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                        lineNumber: 148,
                                        columnNumber: 29
                                    }, this),
                                    "Cancel"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                lineNumber: 144,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleManualSave,
                                disabled: !hasChanges || isSaving || isOverLimit,
                                className: "px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                        lineNumber: 157,
                                        columnNumber: 25
                                    }, this),
                                    isSaving ? 'Saving...' : 'Save'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                lineNumber: 152,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                        lineNumber: 142,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                lineNumber: 134,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-xs text-gray-400 dark:text-gray-600",
                children: "Supports Markdown: **bold**, *italic*, [links](url), lists, etc."
            }, void 0, false, {
                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                lineNumber: 164,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
        lineNumber: 105,
        columnNumber: 9
    }, this);
}
}),
"[project]/hooks/useNotes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Hook for managing notes on roadmap entities
 */ __turbopack_context__.s([
    "useNotes",
    ()=>useNotes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$RoadmapContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/RoadmapContext.tsx [app-ssr] (ecmascript)");
;
;
function useNotes(options) {
    const { roadmap, setRoadmapDirect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$RoadmapContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRoadmap"])();
    const { entityType, weekNumber, section, topicIndex, deliverableIndex, resourceIndex } = options;
    // Get current note content
    const getCurrentNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!roadmap || weekNumber === undefined) return undefined;
        const phase = roadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
        if (!phase) return undefined;
        const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
        if (!week) return undefined;
        switch(entityType){
            case 'week':
                return week.notes;
            case 'deliverable':
                if (deliverableIndex === undefined || !section) return undefined;
                let deliverables;
                if (section === 'build') deliverables = week.buildSection?.deliverables;
                else if (section === 'research') deliverables = week.researchSection?.deliverables;
                else if (section === 'share') deliverables = week.shareSection?.deliverables;
                return deliverables?.[deliverableIndex]?.notes;
            case 'topic':
                if (topicIndex === undefined) return undefined;
                return week.researchSection?.deepDiveTopics?.[topicIndex]?.notes;
            case 'resource':
                if (resourceIndex === undefined || topicIndex === undefined) return undefined;
                return week.researchSection?.deepDiveTopics?.[topicIndex]?.suggestedResources?.[resourceIndex]?.notes;
            default:
                return undefined;
        }
    }, [
        roadmap,
        weekNumber,
        entityType,
        section,
        topicIndex,
        deliverableIndex,
        resourceIndex
    ]);
    // Save note
    const saveNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (content)=>{
        if (!roadmap || weekNumber === undefined) {
            throw new Error('No roadmap loaded or invalid week number');
        }
        const updatedRoadmap = {
            ...roadmap
        };
        const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
        if (!phase) throw new Error('Phase not found');
        const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
        if (!week) throw new Error('Week not found');
        const timestamp = new Date().toISOString();
        switch(entityType){
            case 'week':
                week.notes = content;
                break;
            case 'deliverable':
                if (deliverableIndex === undefined || !section) throw new Error('Invalid deliverable reference');
                let deliverables;
                if (section === 'build') deliverables = week.buildSection?.deliverables;
                else if (section === 'research') deliverables = week.researchSection?.deliverables;
                else if (section === 'share') deliverables = week.shareSection?.deliverables;
                if (deliverables && deliverables[deliverableIndex]) {
                    deliverables[deliverableIndex].notes = content;
                }
                break;
            case 'topic':
                if (topicIndex === undefined) throw new Error('Invalid topic reference');
                const topic = week.researchSection?.deepDiveTopics?.[topicIndex];
                if (topic) {
                    topic.notes = content;
                }
                break;
            case 'resource':
                if (resourceIndex === undefined || topicIndex === undefined) throw new Error('Invalid resource reference');
                const resource = week.researchSection?.deepDiveTopics?.[topicIndex]?.suggestedResources?.[resourceIndex];
                if (resource) {
                    resource.notes = content;
                }
                break;
        }
        setRoadmapDirect(updatedRoadmap);
    // TODO: Call API to persist changes
    // await fetch(`/api/notes`, {
    //   method: 'POST',
    //   body: JSON.stringify({ entityType, entityId, content, timestamp })
    // });
    }, [
        roadmap,
        weekNumber,
        entityType,
        section,
        topicIndex,
        deliverableIndex,
        resourceIndex,
        setRoadmapDirect
    ]);
    const currentNote = getCurrentNote();
    return {
        note: currentNote,
        saveNote
    };
}
}),
"[project]/components/viewer/editable/EditableDeliverable.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditableDeliverable",
    ()=>EditableDeliverable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-ssr] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/progress/tracker.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$RemoveButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/actions/RemoveButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SelectionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/SelectionContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$notes$2f$NoteIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/notes/NoteIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$notes$2f$NoteEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/notes/NoteEditor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useNotes.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function EditableDeliverable({ deliverable, weekNumber, index, section, roadmapId, isCompleted, onToggle, onSave, onRemove }) {
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isNoteOpen, setIsNoteOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(deliverable.description);
    const itemId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'deliverable', index, section);
    const { note, saveNote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotes"])({
        entityType: 'deliverable',
        entityId: itemId,
        weekNumber,
        section,
        deliverableIndex: index
    });
    const { isSelected, toggleSelection, isSelectionMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SelectionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelection"])();
    const selected = isSelected(itemId);
    const showSelectionCheckbox = isSelectionMode; // Only show when in selection mode
    const handleSave = ()=>{
        if (onSave) {
            onSave(itemId, description);
        }
        setIsEditing(false);
    };
    const handleCancel = ()=>{
        setDescription(deliverable.description);
        setIsEditing(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `group flex items-start gap-3 p-2 rounded-lg transition-colors ${selected ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`,
        children: [
            showSelectionCheckbox && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 flex items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    checked: selected,
                    onChange: ()=>toggleSelection(itemId),
                    className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                }, void 0, false, {
                    fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                    lineNumber: 71,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                lineNumber: 70,
                columnNumber: 17
            }, this),
            !showSelectionCheckbox && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    checked: isCompleted,
                    onChange: (e)=>onToggle(itemId, e.target.checked),
                    className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                }, void 0, false, {
                    fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                    lineNumber: 83,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                lineNumber: 82,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: description,
                                onChange: (e)=>setDescription(e.target.value),
                                className: "w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700",
                                rows: 2,
                                autoFocus: true
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                lineNumber: 95,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSave,
                                        className: "flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                                lineNumber: 107,
                                                columnNumber: 33
                                            }, this),
                                            " Save"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                        lineNumber: 103,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleCancel,
                                        className: "flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                                lineNumber: 113,
                                                columnNumber: 33
                                            }, this),
                                            " Cancel"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                        lineNumber: 109,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                lineNumber: 102,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                        lineNumber: 94,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative group/text pr-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-sm ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`,
                                children: description
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                lineNumber: 119,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-0 top-0 flex items-center gap-1 transition-opacity bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded px-1 opacity-100 md:opacity-0 md:group-hover/text:opacity-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsEditing(true),
                                        className: "p-1 text-gray-400 hover:text-blue-600 transition-colors",
                                        title: "Edit deliverable",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                            lineNumber: 129,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                        lineNumber: 124,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$notes$2f$NoteIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoteIcon"], {
                                        content: note,
                                        onClick: ()=>setIsNoteOpen(!isNoteOpen),
                                        className: "p-1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                        lineNumber: 131,
                                        columnNumber: 29
                                    }, this),
                                    onRemove && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$RemoveButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveButton"], {
                                        onRemove: ()=>onRemove(itemId),
                                        itemName: "deliverable",
                                        iconSize: 12
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                        lineNumber: 137,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                lineNumber: 123,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                        lineNumber: 118,
                        columnNumber: 21
                    }, this),
                    isNoteOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$notes$2f$NoteEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoteEditor"], {
                            entityType: "deliverable",
                            entityId: itemId,
                            initialContent: note,
                            onSave: async (content)=>{
                                await saveNote(content);
                                setIsNoteOpen(false);
                            },
                            onCancel: ()=>setIsNoteOpen(false),
                            autoFocus: true,
                            placeholder: "Add notes for this deliverable..."
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                            lineNumber: 150,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                        lineNumber: 149,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                lineNumber: 92,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
        lineNumber: 66,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/viewer/dnd/DraggableDeliverable.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DraggableDeliverable",
    ()=>DraggableDeliverable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-ssr] (ecmascript) <export default as GripVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$editable$2f$EditableDeliverable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/editable/EditableDeliverable.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function DraggableDeliverable({ id, deliverable, weekNumber, index, section, roadmapId, isCompleted, onToggle, onSave, onRemove }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSortable"])({
        id
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        style: style,
        className: "flex items-start gap-2 group/drag",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ...attributes,
                ...listeners,
                className: "mt-3 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 opacity-0 group-hover/drag:opacity-100 transition-opacity",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__["GripVertical"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/components/viewer/dnd/DraggableDeliverable.tsx",
                    lineNumber: 56,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/dnd/DraggableDeliverable.tsx",
                lineNumber: 51,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$editable$2f$EditableDeliverable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditableDeliverable"], {
                    deliverable: deliverable,
                    weekNumber: weekNumber,
                    index: index,
                    section: section,
                    roadmapId: roadmapId,
                    isCompleted: isCompleted,
                    onToggle: onToggle,
                    onSave: onSave,
                    onRemove: onRemove
                }, void 0, false, {
                    fileName: "[project]/components/viewer/dnd/DraggableDeliverable.tsx",
                    lineNumber: 59,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/dnd/DraggableDeliverable.tsx",
                lineNumber: 58,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/dnd/DraggableDeliverable.tsx",
        lineNumber: 50,
        columnNumber: 9
    }, this);
}
}),
"[project]/lib/validation/guardrails.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Guardrails System
 *
 * Three-tier guardrail system for roadmap editing:
 * - Tier 1: Structural (cannot override - hard constraints)
 * - Tier 2: Content (can edit with validation)
 * - Tier 3: Quality (warnings only, not blockers)
 */ __turbopack_context__.s([
    "DEFAULT_CONTENT_GUARDRAILS",
    ()=>DEFAULT_CONTENT_GUARDRAILS,
    "DEFAULT_QUALITY_GUARDRAILS",
    ()=>DEFAULT_QUALITY_GUARDRAILS,
    "DEFAULT_STRUCTURAL_GUARDRAILS",
    ()=>DEFAULT_STRUCTURAL_GUARDRAILS,
    "extractStructuralGuardrails",
    ()=>extractStructuralGuardrails,
    "generateQualityWarnings",
    ()=>generateQualityWarnings,
    "validateContentConstraints",
    ()=>validateContentConstraints,
    "validateStructuralConstraints",
    ()=>validateStructuralConstraints
]);
const DEFAULT_STRUCTURAL_GUARDRAILS = {
    totalDurationWeeks: 0,
    phaseCount: 0,
    weekNumbers: [],
    phaseWeekDistribution: {
        min: 2,
        max: 8
    },
    hoursPerWeek: {
        min: 5,
        max: 40
    }
};
function extractStructuralGuardrails(roadmap) {
    const weekNumbers = [];
    roadmap.phases?.forEach((phase)=>{
        phase.weeks?.forEach((week)=>{
            weekNumbers.push(week.weekNumber);
        });
    });
    return {
        totalDurationWeeks: roadmap.totalDurationWeeks || 0,
        phaseCount: roadmap.phases?.length || 0,
        weekNumbers,
        phaseWeekDistribution: DEFAULT_STRUCTURAL_GUARDRAILS.phaseWeekDistribution,
        hoursPerWeek: DEFAULT_STRUCTURAL_GUARDRAILS.hoursPerWeek
    };
}
const DEFAULT_CONTENT_GUARDRAILS = {
    deliverables: {
        minPerWeek: 1,
        maxPerWeek: 10,
        requiredFields: [
            'description'
        ],
        maxDescriptionLength: 500
    },
    resources: {
        minPerTopic: 0,
        maxPerTopic: 20,
        urlValidation: true,
        requiredFields: [
            'title',
            'type'
        ]
    },
    notes: {
        maxLength: 5000,
        allowMarkdown: true
    },
    timeAllocation: {
        buildPercentage: {
            min: 40,
            max: 80
        },
        researchPercentage: {
            min: 10,
            max: 40
        },
        sharePercentage: {
            min: 5,
            max: 25
        }
    },
    weekFields: {
        titleMaxLength: 100,
        themeMaxLength: 100,
        descriptionMaxLength: 1000
    }
};
const DEFAULT_QUALITY_GUARDRAILS = {
    warnings: {
        noResources: 'Week has no resources - consider adding some',
        fewDeliverables: 'Only 1 deliverable - consider adding 2-3 more for better granularity',
        vagueTitles: 'Title is too generic - be more specific about what you\'ll build',
        noSubtasks: 'Topic has no subtasks - consider breaking it down into smaller steps',
        skippedWeeks: 'You have skipped 3+ weeks - is this intentional?',
        lowResourceQuality: 'Some resources are missing URLs or descriptions',
        missingUrls: 'Resource is missing a URL - add a link for easy access'
    },
    suggestions: {
        aiEnhancement: true,
        resourceRecommendations: true,
        deliverableSuggestions: true
    }
};
function validateStructuralConstraints(roadmap, guardrails) {
    const errors = [];
    // Check total duration hasn't changed
    if (roadmap.totalDurationWeeks !== guardrails.totalDurationWeeks) {
        errors.push({
            code: 'DURATION_CHANGED',
            severity: 'error',
            message: `Total duration cannot be changed. Expected ${guardrails.totalDurationWeeks} weeks.`,
            field: 'totalDurationWeeks'
        });
    }
    // Check phase count hasn't changed
    if (roadmap.phases?.length !== guardrails.phaseCount) {
        errors.push({
            code: 'PHASE_COUNT_CHANGED',
            severity: 'error',
            message: `Phase count cannot be changed. Expected ${guardrails.phaseCount} phases.`,
            field: 'phases'
        });
    }
    // Check week numbers are intact
    const currentWeekNumbers = [];
    roadmap.phases?.forEach((phase)=>{
        phase.weeks?.forEach((week)=>{
            currentWeekNumbers.push(week.weekNumber);
        });
    });
    const missingWeeks = guardrails.weekNumbers.filter((n)=>!currentWeekNumbers.includes(n));
    if (missingWeeks.length > 0) {
        errors.push({
            code: 'WEEKS_MISSING',
            severity: 'error',
            message: `Weeks cannot be deleted: ${missingWeeks.join(', ')}`,
            field: 'weeks'
        });
    }
    // Validate hours per week
    roadmap.phases?.forEach((phase, phaseIndex)=>{
        phase.weeks?.forEach((week, weekIndex)=>{
            if (week.totalHours < guardrails.hoursPerWeek.min) {
                errors.push({
                    code: 'HOURS_TOO_LOW',
                    severity: 'error',
                    message: `Week ${week.weekNumber} has ${week.totalHours} hours. Minimum is ${guardrails.hoursPerWeek.min}.`,
                    field: 'totalHours',
                    location: {
                        phaseNumber: phase.phaseNumber,
                        weekNumber: week.weekNumber
                    }
                });
            }
            if (week.totalHours > guardrails.hoursPerWeek.max) {
                errors.push({
                    code: 'HOURS_TOO_HIGH',
                    severity: 'error',
                    message: `Week ${week.weekNumber} has ${week.totalHours} hours. Maximum is ${guardrails.hoursPerWeek.max}.`,
                    field: 'totalHours',
                    location: {
                        phaseNumber: phase.phaseNumber,
                        weekNumber: week.weekNumber
                    }
                });
            }
        });
    });
    return errors;
}
function validateContentConstraints(roadmap, guardrails) {
    const errors = [];
    roadmap.phases?.forEach((phase)=>{
        phase.weeks?.forEach((week)=>{
            // Validate deliverables
            const deliverableCount = week.buildSection?.deliverables?.length || 0;
            if (deliverableCount < guardrails.deliverables.minPerWeek) {
                errors.push({
                    code: 'TOO_FEW_DELIVERABLES',
                    severity: 'error',
                    message: `Week ${week.weekNumber} has ${deliverableCount} deliverable(s). Minimum is ${guardrails.deliverables.minPerWeek}.`,
                    field: 'deliverables',
                    location: {
                        phaseNumber: phase.phaseNumber,
                        weekNumber: week.weekNumber
                    }
                });
            }
            if (deliverableCount > guardrails.deliverables.maxPerWeek) {
                errors.push({
                    code: 'TOO_MANY_DELIVERABLES',
                    severity: 'error',
                    message: `Week ${week.weekNumber} has ${deliverableCount} deliverables. Maximum is ${guardrails.deliverables.maxPerWeek}.`,
                    field: 'deliverables',
                    location: {
                        phaseNumber: phase.phaseNumber,
                        weekNumber: week.weekNumber
                    }
                });
            }
            // Validate each deliverable
            week.buildSection?.deliverables?.forEach((deliverable, index)=>{
                if (!deliverable.description || deliverable.description.trim() === '') {
                    errors.push({
                        code: 'DELIVERABLE_NO_DESCRIPTION',
                        severity: 'error',
                        message: `Deliverable ${index + 1} in Week ${week.weekNumber} has no description.`,
                        field: 'deliverables.description',
                        location: {
                            phaseNumber: phase.phaseNumber,
                            weekNumber: week.weekNumber,
                            deliverableIndex: index
                        }
                    });
                }
                if (deliverable.description?.length > guardrails.deliverables.maxDescriptionLength) {
                    errors.push({
                        code: 'DELIVERABLE_DESCRIPTION_TOO_LONG',
                        severity: 'error',
                        message: `Deliverable description in Week ${week.weekNumber} is too long. Maximum is ${guardrails.deliverables.maxDescriptionLength} characters.`,
                        field: 'deliverables.description',
                        location: {
                            phaseNumber: phase.phaseNumber,
                            weekNumber: week.weekNumber,
                            deliverableIndex: index
                        }
                    });
                }
            });
            // Validate resources
            week.researchSection?.deepDiveTopics?.forEach((topic, topicIndex)=>{
                const resourceCount = topic.suggestedResources?.length || 0;
                if (resourceCount > guardrails.resources.maxPerTopic) {
                    errors.push({
                        code: 'TOO_MANY_RESOURCES',
                        severity: 'error',
                        message: `Topic ${topicIndex + 1} in Week ${week.weekNumber} has ${resourceCount} resources. Maximum is ${guardrails.resources.maxPerTopic}.`,
                        field: 'resources',
                        location: {
                            phaseNumber: phase.phaseNumber,
                            weekNumber: week.weekNumber,
                            topicIndex
                        }
                    });
                }
                // Validate each resource
                topic.suggestedResources?.forEach((resource, resourceIndex)=>{
                    if (!resource.title || resource.title.trim() === '') {
                        errors.push({
                            code: 'RESOURCE_NO_TITLE',
                            severity: 'error',
                            message: `Resource ${resourceIndex + 1} in Week ${week.weekNumber} has no title.`,
                            field: 'resources.title',
                            location: {
                                phaseNumber: phase.phaseNumber,
                                weekNumber: week.weekNumber,
                                topicIndex,
                                resourceIndex
                            }
                        });
                    }
                    if (guardrails.resources.urlValidation && resource.url) {
                        if (!isValidUrl(resource.url)) {
                            errors.push({
                                code: 'RESOURCE_INVALID_URL',
                                severity: 'error',
                                message: `Resource "${resource.title}" has an invalid URL.`,
                                field: 'resources.url',
                                location: {
                                    phaseNumber: phase.phaseNumber,
                                    weekNumber: week.weekNumber,
                                    topicIndex,
                                    resourceIndex
                                },
                                suggestion: 'Ensure URL starts with http:// or https://'
                            });
                        }
                    }
                });
            });
            // Validate week fields
            if (week.title && week.title.length > guardrails.weekFields.titleMaxLength) {
                errors.push({
                    code: 'WEEK_TITLE_TOO_LONG',
                    severity: 'error',
                    message: `Week ${week.weekNumber} title is too long. Maximum is ${guardrails.weekFields.titleMaxLength} characters.`,
                    field: 'title',
                    location: {
                        phaseNumber: phase.phaseNumber,
                        weekNumber: week.weekNumber
                    }
                });
            }
        });
    });
    return errors;
}
function generateQualityWarnings(roadmap, guardrails) {
    const warnings = [];
    roadmap.phases?.forEach((phase)=>{
        phase.weeks?.forEach((week)=>{
            // Check for no resources
            const hasResources = week.researchSection?.deepDiveTopics?.some((topic)=>topic.suggestedResources && topic.suggestedResources.length > 0);
            if (!hasResources) {
                warnings.push({
                    code: 'NO_RESOURCES',
                    severity: 'warning',
                    message: guardrails.warnings.noResources,
                    suggestion: guardrails.suggestions.resourceRecommendations ? 'Use AI to suggest resources for this week' : undefined,
                    location: {
                        phaseNumber: phase.phaseNumber,
                        weekNumber: week.weekNumber
                    }
                });
            }
            // Check for few deliverables
            const deliverableCount = week.buildSection?.deliverables?.length || 0;
            if (deliverableCount === 1) {
                warnings.push({
                    code: 'FEW_DELIVERABLES',
                    severity: 'info',
                    message: guardrails.warnings.fewDeliverables,
                    suggestion: guardrails.suggestions.deliverableSuggestions ? 'Use AI to suggest more deliverables' : undefined,
                    location: {
                        phaseNumber: phase.phaseNumber,
                        weekNumber: week.weekNumber
                    }
                });
            }
            // Check for vague titles
            if (week.title && isVagueTitle(week.title)) {
                warnings.push({
                    code: 'VAGUE_TITLE',
                    severity: 'info',
                    message: guardrails.warnings.vagueTitles,
                    suggestion: 'Be specific about technologies and outcomes',
                    location: {
                        phaseNumber: phase.phaseNumber,
                        weekNumber: week.weekNumber
                    }
                });
            }
            // Check for missing URLs
            week.researchSection?.deepDiveTopics?.forEach((topic)=>{
                topic.suggestedResources?.forEach((resource)=>{
                    if (!resource.url || resource.url.trim() === '') {
                        warnings.push({
                            code: 'MISSING_URL',
                            severity: 'warning',
                            message: `"${resource.title}": ${guardrails.warnings.missingUrls}`,
                            location: {
                                phaseNumber: phase.phaseNumber,
                                weekNumber: week.weekNumber
                            }
                        });
                    }
                });
            });
        });
    });
    return warnings;
}
// ============================================================================
// Helper Functions
// ============================================================================
/**
 * Validates if a string is a valid URL
 */ function isValidUrl(url) {
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch  {
        return false;
    }
}
/**
 * Checks if a title is too vague
 */ function isVagueTitle(title) {
    const vagueWords = [
        'learn',
        'study',
        'basics',
        'introduction',
        'overview',
        'fundamentals',
        'getting started'
    ];
    const lowerTitle = title.toLowerCase();
    return vagueWords.some((word)=>lowerTitle.includes(word)) && title.split(' ').length < 5;
}
}),
"[project]/components/viewer/actions/AddDeliverableButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddDeliverableButton",
    ()=>AddDeliverableButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$guardrails$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/guardrails.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function AddDeliverableButton({ weekNumber, section, currentCount, onAdd }) {
    const [isAdding, setIsAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [warnings, setWarnings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const maxDeliverables = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$guardrails$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_CONTENT_GUARDRAILS"].deliverables.maxPerWeek;
    const canAdd = currentCount < maxDeliverables;
    const handleAdd = ()=>{
        setIsAdding(true);
        setDescription('');
        setErrors([]);
        setWarnings([]);
    };
    const handleCancel = ()=>{
        setIsAdding(false);
        setDescription('');
        setErrors([]);
        setWarnings([]);
    };
    const handleSave = async ()=>{
        // Validate description
        const errors = [];
        const warnings = [];
        if (!description || description.trim() === '') {
            errors.push('Deliverable description is required.');
        } else if (description.length < 10) {
            warnings.push('Description is very short. Consider being more specific about what needs to be delivered.');
        }
        // Check for vague terms
        const vagueTerms = [
            'complete',
            'finish',
            'do',
            'work on',
            'project'
        ];
        const lowerDesc = description.toLowerCase();
        const hasVagueTerm = vagueTerms.some((term)=>lowerDesc.includes(term) && lowerDesc.split(' ').length < 5);
        if (hasVagueTerm) {
            warnings.push('Description seems vague. Be specific about what will be delivered (e.g., "Deploy to Vercel with public URL").');
        }
        if (errors.length > 0) {
            setErrors(errors);
            setWarnings(warnings);
            return;
        }
        setWarnings(warnings);
        try {
            setIsSubmitting(true);
            await onAdd(description);
            setIsAdding(false);
            setDescription('');
            setErrors([]);
            setWarnings([]);
        } catch (error) {
            setErrors([
                'Failed to add deliverable. Please try again.'
            ]);
        } finally{
            setIsSubmitting(false);
        }
    };
    if (!canAdd) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-gray-500 dark:text-gray-400 italic",
            children: [
                "Maximum ",
                maxDeliverables,
                " deliverables reached"
            ]
        }, void 0, true, {
            fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
            lineNumber: 89,
            columnNumber: 13
        }, this);
    }
    if (isAdding) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-[var(--space-3)] border-2 border-dashed border-primary/30 rounded-md bg-primary/5 space-y-[var(--space-3)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block text-xs font-medium text-text-secondary mb-1",
                            children: "New Deliverable"
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                            lineNumber: 99,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: description,
                            onChange: (e)=>setDescription(e.target.value),
                            placeholder: "e.g., Deploy working prototype to Vercel with public URL",
                            className: `w-full p-[var(--space-2)] text-sm border border-border rounded-sm focus:outline-none focus:border-primary bg-surface text-text-primary ${errors.length > 0 ? 'border-red-500' : ''}`,
                            rows: 2,
                            autoFocus: true,
                            disabled: isSubmitting
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                            lineNumber: 102,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                    lineNumber: 98,
                    columnNumber: 17
                }, this),
                errors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: errors.map((error, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-red-600",
                            children: [
                                "❌ ",
                                error
                            ]
                        }, idx, true, {
                            fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                            lineNumber: 118,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                    lineNumber: 116,
                    columnNumber: 21
                }, this),
                warnings.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: warnings.map((warning, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-yellow-600",
                            children: [
                                "⚠️ ",
                                warning
                            ]
                        }, idx, true, {
                            fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                            lineNumber: 129,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                    lineNumber: 127,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSave,
                            disabled: isSubmitting || !description.trim(),
                            className: "flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-primary rounded-sm hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                                    lineNumber: 142,
                                    columnNumber: 25
                                }, this),
                                isSubmitting ? 'Adding...' : 'Add'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                            lineNumber: 137,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleCancel,
                            disabled: isSubmitting,
                            className: "flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-text-secondary bg-transparent rounded-sm hover:bg-bg-secondary hover:text-text-primary disabled:opacity-50 transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                                    lineNumber: 150,
                                    columnNumber: 25
                                }, this),
                                "Cancel"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                            lineNumber: 145,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                    lineNumber: 136,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
            lineNumber: 97,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleAdd,
        className: "flex items-center gap-1.5 text-xs font-medium text-text-tertiary hover:text-primary transition-colors py-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                className: "w-3.5 h-3.5"
            }, void 0, false, {
                fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                lineNumber: 163,
                columnNumber: 13
            }, this),
            "Add deliverable"
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
        lineNumber: 159,
        columnNumber: 9
    }, this);
}
}),
"[project]/hooks/useRoadmapMutations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Hook for managing roadmap mutations (add/remove/update)
 * Handles optimistic updates and validation
 */ __turbopack_context__.s([
    "useRoadmapMutations",
    ()=>useRoadmapMutations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$RoadmapContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/RoadmapContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-ssr] (ecmascript)");
;
;
;
function useRoadmapMutations() {
    const { roadmap, setRoadmapDirect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$RoadmapContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRoadmap"])();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const apiClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApiClient"])();
    const persistRoadmap = async (updatedRoadmap)=>{
        try {
            await apiClient.patch(`/api/roadmaps/${updatedRoadmap.id}`, {
                current_roadmap: updatedRoadmap
            });
        } catch (err) {
            console.error('Failed to persist roadmap:', err);
            throw err;
        }
    };
    /**
     * Add a deliverable to a week section
     */ const addDeliverable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, section, description, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        const newDeliverable = {
            description,
            isCompleted: false
        };
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week) {
                    if (section === 'build' && week.buildSection) {
                        week.buildSection.deliverables = [
                            ...week.buildSection.deliverables || [],
                            newDeliverable
                        ];
                    } else if (section === 'research' && week.researchSection) {
                        week.researchSection.deliverables = [
                            ...week.researchSection.deliverables || [],
                            newDeliverable
                        ];
                    } else if (section === 'share' && week.shareSection) {
                        week.shareSection.deliverables = [
                            ...week.shareSection.deliverables || [],
                            newDeliverable
                        ];
                    }
                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            // Rollback optimistic update on error
            // In a real implementation, we'd restore from a saved state
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Remove a deliverable from a week section
     */ const removeDeliverable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, section, index, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week) {
                    if (section === 'build' && week.buildSection?.deliverables) {
                        week.buildSection.deliverables = week.buildSection.deliverables.filter((_, i)=>i !== index);
                    } else if (section === 'research' && week.researchSection?.deliverables) {
                        week.researchSection.deliverables = week.researchSection.deliverables.filter((_, i)=>i !== index);
                    } else if (section === 'share' && week.shareSection?.deliverables) {
                        week.shareSection.deliverables = week.shareSection.deliverables.filter((_, i)=>i !== index);
                    }
                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Add a resource to a topic
     */ const addResource = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, topicIndex, resource, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]) {
                    const topic = week.researchSection.deepDiveTopics[topicIndex];
                    topic.suggestedResources = [
                        ...topic.suggestedResources || [],
                        resource
                    ];
                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Remove a resource from a topic
     */ const removeResource = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, topicIndex, resourceIndex, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]?.suggestedResources) {
                    const topic = week.researchSection.deepDiveTopics[topicIndex];
                    if (topic.suggestedResources) {
                        topic.suggestedResources = topic.suggestedResources.filter((_, i)=>i !== resourceIndex);
                    }
                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Reorder deliverables within a week section
     */ const reorderDeliverables = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, section, startIndex, endIndex, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week) {
                    let deliverables;
                    if (section === 'build') deliverables = week.buildSection?.deliverables;
                    else if (section === 'research') deliverables = week.researchSection?.deliverables;
                    else if (section === 'share') deliverables = week.shareSection?.deliverables;
                    if (deliverables) {
                        const [removed] = deliverables.splice(startIndex, 1);
                        deliverables.splice(endIndex, 0, removed);
                        if (options?.optimistic !== false) {
                            setRoadmapDirect(updatedRoadmap);
                        }
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Reorder resources within a topic
     */ /**
     * Reorder resources within a topic
     */ const reorderResources = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, topicIndex, startIndex, endIndex, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]?.suggestedResources) {
                    const resources = week.researchSection.deepDiveTopics[topicIndex].suggestedResources;
                    if (resources) {
                        const [removed] = resources.splice(startIndex, 1);
                        resources.splice(endIndex, 0, removed);
                        if (options?.optimistic !== false) {
                            setRoadmapDirect(updatedRoadmap);
                        }
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Toggle deliverable completion status
     */ const toggleDeliverable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, section, index, isCompleted, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week) {
                    let deliverable;
                    if (section === 'build') deliverable = week.buildSection?.deliverables?.[index];
                    else if (section === 'research') deliverable = week.researchSection?.deliverables?.[index];
                    else if (section === 'share') deliverable = week.shareSection?.deliverables?.[index];
                    if (deliverable) {
                        deliverable.isCompleted = isCompleted;
                        if (options?.optimistic !== false) {
                            setRoadmapDirect(updatedRoadmap);
                        }
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Update deliverable description
     */ const updateDeliverable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, section, index, description, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week) {
                    let deliverable;
                    if (section === 'build') deliverable = week.buildSection?.deliverables?.[index];
                    else if (section === 'research') deliverable = week.researchSection?.deliverables?.[index];
                    else if (section === 'share') deliverable = week.shareSection?.deliverables?.[index];
                    if (deliverable) {
                        deliverable.description = description;
                        if (options?.optimistic !== false) {
                            setRoadmapDirect(updatedRoadmap);
                        }
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Update resource details
     */ const updateResource = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, topicIndex, resourceIndex, resource, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]?.suggestedResources) {
                    const resources = week.researchSection.deepDiveTopics[topicIndex].suggestedResources;
                    if (resources && resources[resourceIndex]) {
                        resources[resourceIndex] = resource;
                        if (options?.optimistic !== false) {
                            setRoadmapDirect(updatedRoadmap);
                        }
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Toggle topic completion status
     */ const toggleTopic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, topicIndex, isCompleted, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]) {
                    week.researchSection.deepDiveTopics[topicIndex].isCompleted = isCompleted;
                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Update topic description
     */ const updateTopic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, topicIndex, description, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]) {
                    week.researchSection.deepDiveTopics[topicIndex].description = description;
                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Remove a topic
     */ const removeTopic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, topicIndex, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics) {
                    week.researchSection.deepDiveTopics = week.researchSection.deepDiveTopics.filter((_, i)=>i !== topicIndex);
                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    return {
        addDeliverable,
        removeDeliverable,
        reorderDeliverables,
        addResource,
        removeResource,
        reorderResources,
        toggleDeliverable,
        updateDeliverable,
        updateResource,
        toggleTopic,
        updateTopic,
        removeTopic,
        isLoading,
        error
    };
}
}),
"[project]/components/ui/DeliverableList.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeliverableList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-ssr] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$dnd$2f$DraggableDeliverable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/dnd/DraggableDeliverable.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$AddDeliverableButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/actions/AddDeliverableButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRoadmapMutations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useRoadmapMutations.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/progress/tracker.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function DeliverableList({ deliverables, title, weekNumber = 1, section = 'build', roadmapId = 'default' }) {
    const { addDeliverable, removeDeliverable, reorderDeliverables } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRoadmapMutations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRoadmapMutations"])();
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointerSensor"]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KeyboardSensor"], {
        coordinateGetter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sortableKeyboardCoordinates"]
    }));
    const handleDragEnd = async (event)=>{
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = deliverables.findIndex((_, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'deliverable', i, section) === active.id);
            const newIndex = deliverables.findIndex((_, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'deliverable', i, section) === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
                await reorderDeliverables(weekNumber, section, oldIndex, newIndex);
            }
        }
    };
    const handleToggle = (id, checked)=>{
        // TODO: Call API to update progress
        console.log('Toggle', id, checked);
    };
    const handleSave = (id, newDescription)=>{
        // TODO: Call API to update deliverable
        console.log('Save', id, newDescription);
    };
    const handleRemove = async (id)=>{
        // Extract index from ID or find it
        // ID format: w{weekNumber}-deliverable-{index}-{section}
        // But generateItemId might produce something else.
        // Let's find the index by iterating.
        const index = deliverables.findIndex((_, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'deliverable', i, section) === id);
        if (index !== -1) {
            await removeDeliverable(weekNumber, section, index);
        }
    };
    const renderSubtasks = (subtasks)=>{
        if (!subtasks || subtasks.length === 0) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "ml-8 mt-2 space-y-2",
            children: subtasks.map((subtask, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    className: "flex items-start gap-2",
                    children: [
                        subtask.isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                            className: "w-4 h-4 text-green-600 flex-shrink-0 mt-0.5"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/DeliverableList.tsx",
                            lineNumber: 103,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                            className: "w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/DeliverableList.tsx",
                            lineNumber: 105,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `text-sm ${subtask.isCompleted ? 'text-gray-600 dark:text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`,
                            children: subtask.description
                        }, void 0, false, {
                            fileName: "[project]/components/ui/DeliverableList.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this)
                    ]
                }, idx, true, {
                    fileName: "[project]/components/ui/DeliverableList.tsx",
                    lineNumber: 101,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/ui/DeliverableList.tsx",
            lineNumber: 99,
            columnNumber: 7
        }, this);
    };
    if (!deliverables || deliverables.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3",
            children: [
                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                    className: "text-sm font-semibold text-gray-900 dark:text-gray-100",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/components/ui/DeliverableList.tsx",
                    lineNumber: 119,
                    columnNumber: 19
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-500 dark:text-gray-400 italic",
                    children: "No deliverables yet"
                }, void 0, false, {
                    fileName: "[project]/components/ui/DeliverableList.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$AddDeliverableButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AddDeliverableButton"], {
                    weekNumber: weekNumber,
                    section: section,
                    currentCount: 0,
                    onAdd: async (description)=>{
                        await addDeliverable(weekNumber, section, description);
                    }
                }, void 0, false, {
                    fileName: "[project]/components/ui/DeliverableList.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/DeliverableList.tsx",
            lineNumber: 118,
            columnNumber: 7
        }, this);
    }
    // Generate IDs for sortable items
    const items = deliverables.map((_, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'deliverable', index, section));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "text-sm font-semibold text-gray-900 dark:text-gray-100",
                children: title
            }, void 0, false, {
                fileName: "[project]/components/ui/DeliverableList.tsx",
                lineNumber: 140,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DndContext"], {
                sensors: sensors,
                collisionDetection: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["closestCenter"],
                onDragEnd: handleDragEnd,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SortableContext"], {
                    items: items,
                    strategy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalListSortingStrategy"],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-3",
                        children: deliverables.map((item, index)=>{
                            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'deliverable', index, section);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$dnd$2f$DraggableDeliverable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DraggableDeliverable"], {
                                        id: id,
                                        deliverable: item,
                                        weekNumber: weekNumber,
                                        index: index,
                                        section: section,
                                        roadmapId: roadmapId,
                                        isCompleted: item.isCompleted,
                                        onToggle: handleToggle,
                                        onSave: handleSave,
                                        onRemove: handleRemove
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/DeliverableList.tsx",
                                        lineNumber: 156,
                                        columnNumber: 19
                                    }, this),
                                    'subtasks' in item && renderSubtasks(item.subtasks)
                                ]
                            }, id, true, {
                                fileName: "[project]/components/ui/DeliverableList.tsx",
                                lineNumber: 155,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/ui/DeliverableList.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/DeliverableList.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/DeliverableList.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$AddDeliverableButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AddDeliverableButton"], {
                weekNumber: weekNumber,
                section: section,
                currentCount: deliverables.length,
                onAdd: async (description)=>{
                    await addDeliverable(weekNumber, section, description);
                }
            }, void 0, false, {
                fileName: "[project]/components/ui/DeliverableList.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/DeliverableList.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/roadmap/BuildSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BuildSectionComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hammer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hammer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hammer.js [app-ssr] (ecmascript) <export default as Hammer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$DeliverableList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/DeliverableList.tsx [app-ssr] (ecmascript)");
;
;
;
function BuildSectionComponent({ buildSection, weekNumber }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-orange-600 dark:text-orange-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hammer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hammer$3e$__["Hammer"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold",
                        children: [
                            "Build (",
                            buildSection.hours,
                            "h)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/roadmap/BuildSection.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-base font-semibold text-gray-900 dark:text-gray-100 mb-2",
                                children: buildSection.projectTitle
                            }, void 0, false, {
                                fileName: "[project]/components/roadmap/BuildSection.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed",
                                children: buildSection.description
                            }, void 0, false, {
                                fileName: "[project]/components/roadmap/BuildSection.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    buildSection.technicalStack && buildSection.technicalStack.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                className: "text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2",
                                children: "Technical Stack"
                            }, void 0, false, {
                                fileName: "[project]/components/roadmap/BuildSection.tsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: buildSection.technicalStack.map((tech, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full",
                                        children: tech
                                    }, index, false, {
                                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                                        lineNumber: 29,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/roadmap/BuildSection.tsx",
                                lineNumber: 27,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this),
                    buildSection.components && buildSection.components.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                className: "text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                                        lineNumber: 40,
                                        columnNumber: 15
                                    }, this),
                                    "Components"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/roadmap/BuildSection.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-1.5",
                                children: buildSection.components.map((component, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "text-sm text-gray-700 dark:text-gray-300 pl-4 border-l-2 border-orange-300 dark:border-orange-700",
                                        children: component
                                    }, index, false, {
                                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/roadmap/BuildSection.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this),
                    buildSection.deliverables && buildSection.deliverables.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$DeliverableList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        deliverables: buildSection.deliverables,
                        title: "Deliverables",
                        weekNumber: weekNumber,
                        section: "build"
                    }, void 0, false, {
                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/roadmap/BuildSection.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/roadmap/BuildSection.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/viewer/editable/EditableResource.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditableResource",
    ()=>EditableResource
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-ssr] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-ssr] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$RemoveButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/actions/RemoveButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SelectionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/SelectionContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/progress/tracker.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$notes$2f$NoteIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/notes/NoteIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$notes$2f$NoteEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/notes/NoteEditor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useNotes.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function EditableResource({ resource, weekNumber, topicIndex, index, onSave, onDelete }) {
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isNoteOpen, setIsNoteOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editedResource, setEditedResource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(resource);
    const { note, saveNote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotes"])({
        entityType: 'resource',
        entityId: resource.url || resource.title || 'resource',
        weekNumber,
        topicIndex,
        resourceIndex: index
    });
    const { isSelected, toggleSelection, isSelectionMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SelectionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelection"])();
    // Generate ID only if we have all necessary indices
    const itemId = weekNumber !== undefined && topicIndex !== undefined && index !== undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'resource', index, `topic-${topicIndex}`) : null;
    const selected = itemId ? isSelected(itemId) : false;
    const showSelectionCheckbox = isSelectionMode && itemId; // Only show when in selection mode
    const handleSave = ()=>{
        if (onSave) {
            onSave(editedResource);
        }
        setIsEditing(false);
    };
    const handleCancel = ()=>{
        setEditedResource(resource);
        setIsEditing(false);
    };
    const getTypeColor = (type)=>{
        switch(type.toLowerCase()){
            case 'video':
                return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
            case 'article':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
            case 'course':
                return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
            case 'book':
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
        }
    };
    if (isEditing) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-3 border rounded-lg bg-white dark:bg-gray-800 shadow-sm space-y-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block text-xs font-medium text-gray-500 mb-1",
                            children: "Title"
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                            lineNumber: 79,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: editedResource.title,
                            onChange: (e)=>setEditedResource({
                                    ...editedResource,
                                    title: e.target.value
                                }),
                            className: "w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                            lineNumber: 80,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                    lineNumber: 78,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block text-xs font-medium text-gray-500 mb-1",
                            children: "URL"
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                            lineNumber: 88,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: editedResource.url,
                            onChange: (e)=>setEditedResource({
                                    ...editedResource,
                                    url: e.target.value
                                }),
                            className: "w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                            lineNumber: 89,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                    lineNumber: 87,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: editedResource.type,
                            onChange: (e)=>setEditedResource({
                                    ...editedResource,
                                    type: e.target.value
                                }),
                            className: "p-2 text-sm border rounded dark:bg-gray-700 dark:border-gray-600",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "Article",
                                    children: "Article"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                                    lineNumber: 102,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "Video",
                                    children: "Video"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                                    lineNumber: 103,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "Course",
                                    children: "Course"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                                    lineNumber: 104,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "Book",
                                    children: "Book"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                                    lineNumber: 105,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "Tool",
                                    children: "Tool"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                                    lineNumber: 106,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                            lineNumber: 97,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 flex justify-end gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSave,
                                    className: "flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                                            lineNumber: 113,
                                            columnNumber: 29
                                        }, this),
                                        " Save"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                                    lineNumber: 109,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleCancel,
                                    className: "flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                                            lineNumber: 119,
                                            columnNumber: 29
                                        }, this),
                                        " Cancel"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                                    lineNumber: 115,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                            lineNumber: 108,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                    lineNumber: 96,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/viewer/editable/EditableResource.tsx",
            lineNumber: 77,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `group relative flex items-center gap-2 p-2 rounded transition-colors ${selected ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`,
        children: [
            showSelectionCheckbox && itemId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "checkbox",
                checked: selected,
                onChange: ()=>toggleSelection(itemId),
                className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer flex-shrink-0"
            }, void 0, false, {
                fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                lineNumber: 131,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: resource.url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-3 flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `px-2 py-0.5 text-xs rounded-full font-medium ${getTypeColor(resource.type)}`,
                        children: resource.type
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                        lineNumber: 145,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-blue-600 hover:underline truncate dark:text-blue-400",
                        children: resource.title
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                        lineNumber: 148,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                        className: "w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                        lineNumber: 151,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                lineNumber: 139,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1 transition-opacity ml-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded px-1 opacity-100 md:opacity-0 md:group-hover:opacity-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.preventDefault();
                            setIsEditing(true);
                        },
                        className: "p-1 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20",
                        title: "Edit resource",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                            lineNumber: 163,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                        lineNumber: 155,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$notes$2f$NoteIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoteIcon"], {
                        content: note,
                        onClick: ()=>setIsNoteOpen(!isNoteOpen),
                        className: "p-1"
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                        lineNumber: 165,
                        columnNumber: 17
                    }, this),
                    onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$RemoveButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveButton"], {
                        onRemove: onDelete,
                        itemName: "resource",
                        iconSize: 14
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                        lineNumber: 171,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                lineNumber: 154,
                columnNumber: 13
            }, this),
            isNoteOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-full left-0 right-0 z-10 mt-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$notes$2f$NoteEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoteEditor"], {
                    entityType: "resource",
                    entityId: itemId || resource.url || resource.title,
                    initialContent: note,
                    onSave: async (content)=>{
                        await saveNote(content);
                        setIsNoteOpen(false);
                    },
                    onCancel: ()=>setIsNoteOpen(false),
                    autoFocus: true,
                    placeholder: "Add notes for this resource..."
                }, void 0, false, {
                    fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                    lineNumber: 182,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/editable/EditableResource.tsx",
                lineNumber: 181,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/editable/EditableResource.tsx",
        lineNumber: 128,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/viewer/dnd/DraggableResource.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DraggableResource",
    ()=>DraggableResource
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-ssr] (ecmascript) <export default as GripVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$editable$2f$EditableResource$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/editable/EditableResource.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function DraggableResource({ id, resource, weekNumber, topicIndex, index, onSave, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSortable"])({
        id
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        style: style,
        className: "flex items-center gap-2 group/drag",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ...attributes,
                ...listeners,
                className: "cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 opacity-0 group-hover/drag:opacity-100 transition-opacity",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__["GripVertical"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/components/viewer/dnd/DraggableResource.tsx",
                    lineNumber: 50,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/dnd/DraggableResource.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$editable$2f$EditableResource$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditableResource"], {
                    resource: resource,
                    weekNumber: weekNumber,
                    topicIndex: topicIndex,
                    index: index,
                    onSave: onSave,
                    onDelete: onDelete
                }, void 0, false, {
                    fileName: "[project]/components/viewer/dnd/DraggableResource.tsx",
                    lineNumber: 53,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/dnd/DraggableResource.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/dnd/DraggableResource.tsx",
        lineNumber: 44,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/viewer/actions/AddResourceButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddResourceButton",
    ()=>AddResourceButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$guardrails$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/guardrails.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function AddResourceButton({ topicId, topicDescription, currentCount, onAdd }) {
    const [isAdding, setIsAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [url, setUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [type, setType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('Article');
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const maxResources = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$guardrails$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_CONTENT_GUARDRAILS"].resources.maxPerTopic;
    const canAdd = currentCount < maxResources;
    const handleAdd = ()=>{
        setIsAdding(true);
        setTitle('');
        setUrl('');
        setType('Article');
        setErrors([]);
    };
    const handleCancel = ()=>{
        setIsAdding(false);
        setTitle('');
        setUrl('');
        setType('Article');
        setErrors([]);
    };
    const validateUrl = (urlString)=>{
        if (!urlString || urlString.trim() === '') {
            return false;
        }
        try {
            const urlObj = new URL(urlString);
            return [
                'http:',
                'https:'
            ].includes(urlObj.protocol);
        } catch  {
            return false;
        }
    };
    const handleSave = async ()=>{
        const validationErrors = [];
        // Validate title
        if (!title || title.trim() === '') {
            validationErrors.push('Resource title is required.');
        } else if (title.length < 3) {
            validationErrors.push('Title is too short. Use a descriptive title.');
        }
        // Validate URL
        if (!url || url.trim() === '') {
            validationErrors.push('URL is required.');
        } else if (!validateUrl(url)) {
            validationErrors.push('Invalid URL. Must start with http:// or https://');
        }
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            setIsSubmitting(true);
            await onAdd({
                title: title.trim(),
                url: url.trim(),
                type
            });
            setIsAdding(false);
            setTitle('');
            setUrl('');
            setType('Article');
            setErrors([]);
        } catch (error) {
            setErrors([
                'Failed to add resource. Please try again.'
            ]);
        } finally{
            setIsSubmitting(false);
        }
    };
    if (!canAdd) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-gray-500 dark:text-gray-400 italic",
            children: [
                "Maximum ",
                maxResources,
                " resources reached"
            ]
        }, void 0, true, {
            fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
            lineNumber: 99,
            columnNumber: 13
        }, this);
    }
    if (isAdding) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-[var(--space-3)] border-2 border-dashed border-primary/30 rounded-md bg-primary/5 space-y-[var(--space-3)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block text-xs font-medium text-text-secondary mb-1",
                            children: "Resource Title"
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                            lineNumber: 109,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: title,
                            onChange: (e)=>setTitle(e.target.value),
                            placeholder: "e.g., React Hooks Complete Guide",
                            className: `w-full p-[var(--space-2)] text-sm border border-border rounded-sm focus:outline-none focus:border-primary bg-surface text-text-primary ${errors.some((e)=>e.includes('title')) ? 'border-red-500' : ''}`,
                            autoFocus: true,
                            disabled: isSubmitting
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                            lineNumber: 112,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                    lineNumber: 108,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block text-xs font-medium text-text-secondary mb-1",
                            children: "URL"
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                            lineNumber: 125,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "url",
                            value: url,
                            onChange: (e)=>setUrl(e.target.value),
                            placeholder: "https://example.com/resource",
                            className: `w-full p-[var(--space-2)] text-sm border border-border rounded-sm focus:outline-none focus:border-primary bg-surface text-text-primary ${errors.some((e)=>e.includes('URL')) ? 'border-red-500' : ''}`,
                            disabled: isSubmitting
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                            lineNumber: 128,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                    lineNumber: 124,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block text-xs font-medium text-text-secondary mb-1",
                            children: "Type"
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                            lineNumber: 140,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: type,
                            onChange: (e)=>setType(e.target.value),
                            className: "w-full p-[var(--space-2)] text-sm border border-border rounded-sm focus:outline-none focus:border-primary bg-surface text-text-primary",
                            disabled: isSubmitting,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "Article",
                                    children: "Article"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                                    lineNumber: 149,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "Video",
                                    children: "Video"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                                    lineNumber: 150,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "Course",
                                    children: "Course"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                                    lineNumber: 151,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "Book",
                                    children: "Book"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                                    lineNumber: 152,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "Tool",
                                    children: "Tool"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                                    lineNumber: 153,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "Documentation",
                                    children: "Documentation"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                                    lineNumber: 154,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                            lineNumber: 143,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                    lineNumber: 139,
                    columnNumber: 17
                }, this),
                errors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: errors.map((error, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-red-600",
                            children: [
                                "❌ ",
                                error
                            ]
                        }, idx, true, {
                            fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                            lineNumber: 162,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                    lineNumber: 160,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSave,
                            disabled: isSubmitting || !title.trim() || !url.trim(),
                            className: "flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-primary rounded-sm hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                                    lineNumber: 175,
                                    columnNumber: 25
                                }, this),
                                isSubmitting ? 'Adding...' : 'Add Resource'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                            lineNumber: 170,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleCancel,
                            disabled: isSubmitting,
                            className: "flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-text-secondary bg-transparent rounded-sm hover:bg-bg-secondary hover:text-text-primary disabled:opacity-50 transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                                    lineNumber: 183,
                                    columnNumber: 25
                                }, this),
                                "Cancel"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                            lineNumber: 178,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                    lineNumber: 169,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
            lineNumber: 107,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleAdd,
        className: "flex items-center gap-1.5 text-xs font-medium text-text-tertiary hover:text-primary transition-colors py-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                className: "w-3.5 h-3.5"
            }, void 0, false, {
                fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
                lineNumber: 196,
                columnNumber: 13
            }, this),
            "Add resource"
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/actions/AddResourceButton.tsx",
        lineNumber: 192,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/ui/ResourceList.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ResourceList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$dnd$2f$DraggableResource$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/dnd/DraggableResource.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$AddResourceButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/actions/AddResourceButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRoadmapMutations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useRoadmapMutations.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/progress/tracker.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function ResourceList({ resources, weekNumber, topicIndex, topicDescription = 'Topic' }) {
    const { addResource, removeResource, reorderResources } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRoadmapMutations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRoadmapMutations"])();
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointerSensor"]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KeyboardSensor"], {
        coordinateGetter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sortableKeyboardCoordinates"]
    }));
    const handleDragEnd = async (event)=>{
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = resources.findIndex((_, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'resource', i, `topic-${topicIndex}`) === active.id);
            const newIndex = resources.findIndex((_, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'resource', i, `topic-${topicIndex}`) === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
                await reorderResources(weekNumber, topicIndex, oldIndex, newIndex);
            }
        }
    };
    const handleSave = (newResource)=>{
        // TODO: Implement update resource
        console.log('Save resource', newResource);
    };
    const handleRemove = async (index)=>{
        await removeResource(weekNumber, topicIndex, index);
    };
    if (!resources || resources.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2",
                    children: "Resources"
                }, void 0, false, {
                    fileName: "[project]/components/ui/ResourceList.tsx",
                    lineNumber: 78,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-gray-500 dark:text-gray-400 italic",
                    children: "No resources yet"
                }, void 0, false, {
                    fileName: "[project]/components/ui/ResourceList.tsx",
                    lineNumber: 79,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$AddResourceButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AddResourceButton"], {
                    topicId: `w${weekNumber}-t${topicIndex}`,
                    topicDescription: topicDescription,
                    currentCount: 0,
                    onAdd: async (resource)=>{
                        await addResource(weekNumber, topicIndex, resource);
                    }
                }, void 0, false, {
                    fileName: "[project]/components/ui/ResourceList.tsx",
                    lineNumber: 80,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/ResourceList.tsx",
            lineNumber: 77,
            columnNumber: 13
        }, this);
    }
    // Generate IDs for sortable items
    const items = resources.map((_, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'resource', index, `topic-${topicIndex}`));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2",
                children: "Resources"
            }, void 0, false, {
                fileName: "[project]/components/ui/ResourceList.tsx",
                lineNumber: 99,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DndContext"], {
                sensors: sensors,
                collisionDetection: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["closestCenter"],
                onDragEnd: handleDragEnd,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SortableContext"], {
                    items: items,
                    strategy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalListSortingStrategy"],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: resources.map((resource, index)=>{
                            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'resource', index, `topic-${topicIndex}`);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$dnd$2f$DraggableResource$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DraggableResource"], {
                                id: id,
                                resource: resource,
                                weekNumber: weekNumber,
                                topicIndex: topicIndex,
                                index: index,
                                onSave: handleSave,
                                onDelete: ()=>handleRemove(index)
                            }, id, false, {
                                fileName: "[project]/components/ui/ResourceList.tsx",
                                lineNumber: 114,
                                columnNumber: 33
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/ui/ResourceList.tsx",
                        lineNumber: 110,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/ResourceList.tsx",
                    lineNumber: 106,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/ResourceList.tsx",
                lineNumber: 101,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$AddResourceButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AddResourceButton"], {
                topicId: `w${weekNumber}-t${topicIndex}`,
                topicDescription: topicDescription,
                currentCount: resources.length,
                onAdd: async (resource)=>{
                    await addResource(weekNumber, topicIndex, resource);
                }
            }, void 0, false, {
                fileName: "[project]/components/ui/ResourceList.tsx",
                lineNumber: 130,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/ResourceList.tsx",
        lineNumber: 98,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/viewer/editable/EditableTopic.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditableTopic",
    ()=>EditableTopic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-ssr] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/progress/tracker.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SelectionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/SelectionContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$notes$2f$NoteIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/notes/NoteIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$notes$2f$NoteEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/notes/NoteEditor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useNotes.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function EditableTopic({ topic, weekNumber, index, isCompleted, onToggle, onSave, onDelete }) {
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isNoteOpen, setIsNoteOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(topic.description);
    const { isSelected, toggleSelection, isSelectionMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SelectionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelection"])();
    const itemId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'topic', index, 'research');
    const selected = isSelected(itemId);
    const showSelectionCheckbox = isSelectionMode;
    const { note, saveNote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotes"])({
        entityType: 'topic',
        entityId: itemId,
        weekNumber,
        topicIndex: index
    });
    const handleSave = ()=>{
        if (onSave) {
            onSave(itemId, description);
        }
        setIsEditing(false);
    };
    const handleCancel = ()=>{
        setDescription(topic.description);
        setIsEditing(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `group flex items-start gap-3 p-2 rounded-lg transition-colors ${selected ? 'bg-purple-50 dark:bg-purple-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 flex items-center gap-2",
                children: showSelectionCheckbox ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    checked: selected,
                    onChange: ()=>toggleSelection(itemId),
                    className: "h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600 cursor-pointer"
                }, void 0, false, {
                    fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                    lineNumber: 63,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    checked: isCompleted,
                    onChange: (e)=>onToggle(itemId, e.target.checked),
                    className: "h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600 cursor-pointer"
                }, void 0, false, {
                    fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                    lineNumber: 70,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                lineNumber: 61,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: description,
                                onChange: (e)=>setDescription(e.target.value),
                                className: "w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700",
                                rows: 2,
                                autoFocus: true
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                                lineNumber: 82,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSave,
                                        className: "flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-purple-600 rounded hover:bg-purple-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                                                lineNumber: 94,
                                                columnNumber: 33
                                            }, this),
                                            " Save"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                                        lineNumber: 90,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleCancel,
                                        className: "flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                                                lineNumber: 100,
                                                columnNumber: 33
                                            }, this),
                                            " Cancel"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                                        lineNumber: 96,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                                lineNumber: 89,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                        lineNumber: 81,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative group/text flex items-start justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-sm ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`,
                                children: description
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                                lineNumber: 106,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover/text:opacity-100 transition-opacity bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded px-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsEditing(true),
                                        className: "p-1 text-gray-400 hover:text-purple-600 transition-colors",
                                        title: "Edit topic",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                                            lineNumber: 116,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                                        lineNumber: 111,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$notes$2f$NoteIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoteIcon"], {
                                        content: note,
                                        onClick: ()=>setIsNoteOpen(!isNoteOpen),
                                        className: "p-1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                                        lineNumber: 118,
                                        columnNumber: 29
                                    }, this),
                                    onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onDelete,
                                        className: "p-1 text-gray-400 hover:text-red-600 transition-colors",
                                        title: "Delete topic",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                                            lineNumber: 129,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                                        lineNumber: 124,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                                lineNumber: 110,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                        lineNumber: 105,
                        columnNumber: 21
                    }, this),
                    isNoteOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$notes$2f$NoteEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoteEditor"], {
                            entityType: "topic",
                            entityId: itemId,
                            initialContent: note,
                            onSave: async (content)=>{
                                await saveNote(content);
                                setIsNoteOpen(false);
                            },
                            onCancel: ()=>setIsNoteOpen(false),
                            autoFocus: true,
                            placeholder: "Add notes for this topic..."
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                            lineNumber: 139,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                        lineNumber: 138,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
                lineNumber: 79,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/editable/EditableTopic.tsx",
        lineNumber: 60,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/roadmap/ResearchSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ResearchSectionComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ResourceList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/ResourceList.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$DeliverableList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/DeliverableList.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$editable$2f$EditableTopic$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/editable/EditableTopic.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRoadmapMutations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useRoadmapMutations.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-ssr] (ecmascript) <export default as Circle>");
;
;
;
;
;
;
function ResearchSectionComponent({ researchSection, weekNumber }) {
    const { toggleTopic, updateTopic, removeTopic } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRoadmapMutations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRoadmapMutations"])();
    const handleToggleTopic = async (id, checked)=>{
        // ID format: w{weekNumber}-topic-{index}-research
        // We need to extract the index
        const parts = id.split('-');
        const indexStr = parts[2]; // w1-topic-0-research -> 0
        const index = parseInt(indexStr);
        if (!isNaN(index)) {
            await toggleTopic(weekNumber, index, checked);
        }
    };
    const handleSaveTopic = async (id, newDescription)=>{
        const parts = id.split('-');
        const indexStr = parts[2];
        const index = parseInt(indexStr);
        if (!isNaN(index)) {
            await updateTopic(weekNumber, index, newDescription);
        }
    };
    const handleRemoveTopic = async (index)=>{
        await removeTopic(weekNumber, index);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-blue-600 dark:text-blue-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/components/roadmap/ResearchSection.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold",
                        children: [
                            "Research (",
                            researchSection.hours,
                            "h)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/roadmap/ResearchSection.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/roadmap/ResearchSection.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    researchSection.deepDiveTopics && researchSection.deepDiveTopics.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-semibold text-gray-900 dark:text-gray-100",
                                children: "Deep Dive Topics"
                            }, void 0, false, {
                                fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this),
                            researchSection.deepDiveTopics.map((topic, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-blue-50/50 dark:bg-blue-950/20 space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$editable$2f$EditableTopic$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditableTopic"], {
                                            topic: topic,
                                            weekNumber: weekNumber,
                                            index: index,
                                            isCompleted: topic.isCompleted,
                                            onToggle: handleToggleTopic,
                                            onSave: handleSaveTopic,
                                            onDelete: ()=>handleRemoveTopic(index)
                                        }, void 0, false, {
                                            fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                            lineNumber: 59,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-8",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ResourceList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                resources: topic.suggestedResources || [],
                                                weekNumber: weekNumber,
                                                topicIndex: index,
                                                topicDescription: topic.description
                                            }, void 0, false, {
                                                fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                                lineNumber: 71,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                            lineNumber: 70,
                                            columnNumber: 17
                                        }, this),
                                        topic.subtasks && topic.subtasks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-8 space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-semibold text-gray-700 dark:text-gray-300",
                                                    children: "Subtasks"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 21
                                                }, this),
                                                topic.subtasks.map((subtask, sIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start gap-2",
                                                                children: [
                                                                    subtask.isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                        className: "w-4 h-4 text-green-600 flex-shrink-0 mt-0.5"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                                                        lineNumber: 87,
                                                                        columnNumber: 29
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                                                        className: "w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                                                        lineNumber: 89,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `text-sm ${subtask.isCompleted ? 'text-gray-600 dark:text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`,
                                                                        children: subtask.description
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                                                        lineNumber: 91,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                                                lineNumber: 85,
                                                                columnNumber: 25
                                                            }, this),
                                                            subtask.suggestedResources && subtask.suggestedResources.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "ml-6 space-y-1",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ResourceList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    resources: subtask.suggestedResources,
                                                                    weekNumber: weekNumber,
                                                                    topicIndex: -1,
                                                                    topicDescription: "Subtask Resource"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                                                    lineNumber: 101,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                                                lineNumber: 100,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, sIndex, true, {
                                                        fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                                        lineNumber: 84,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                            lineNumber: 81,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                    lineNumber: 55,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/roadmap/ResearchSection.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this),
                    researchSection.resources && researchSection.resources.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3",
                                children: "Resources"
                            }, void 0, false, {
                                fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$ResourceList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    resources: researchSection.resources,
                                    weekNumber: weekNumber,
                                    topicIndex: -1,
                                    topicDescription: "General Resources"
                                }, void 0, false, {
                                    fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                    lineNumber: 124,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/roadmap/ResearchSection.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/roadmap/ResearchSection.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this),
                    researchSection.deliverables && researchSection.deliverables.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$DeliverableList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        deliverables: researchSection.deliverables,
                        title: "Research Deliverables",
                        weekNumber: weekNumber,
                        section: "research"
                    }, void 0, false, {
                        fileName: "[project]/components/roadmap/ResearchSection.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/roadmap/ResearchSection.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/roadmap/ResearchSection.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/roadmap/ShareSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShareSectionComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-ssr] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-ssr] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$DeliverableList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/DeliverableList.tsx [app-ssr] (ecmascript)");
;
;
;
function ShareSectionComponent({ shareSection, weekNumber }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-green-600 dark:text-green-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/components/roadmap/ShareSection.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold",
                        children: [
                            "Share (",
                            shareSection.hours,
                            "h)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/roadmap/ShareSection.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/roadmap/ShareSection.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-green-50/50 dark:bg-green-950/20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2",
                                children: shareSection.artifactTitle
                            }, void 0, false, {
                                fileName: "[project]/components/roadmap/ShareSection.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3",
                                children: shareSection.artifactDescription
                            }, void 0, false, {
                                fileName: "[project]/components/roadmap/ShareSection.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this),
                            shareSection.details && shareSection.details.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5 mb-3",
                                children: shareSection.details.map((detail, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-green-300 dark:border-green-700",
                                        children: detail
                                    }, index, false, {
                                        fileName: "[project]/components/roadmap/ShareSection.tsx",
                                        lineNumber: 26,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/roadmap/ShareSection.tsx",
                                lineNumber: 24,
                                columnNumber: 13
                            }, this),
                            shareSection.tags && shareSection.tags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 flex-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                        className: "w-3.5 h-3.5 text-gray-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/roadmap/ShareSection.tsx",
                                        lineNumber: 35,
                                        columnNumber: 15
                                    }, this),
                                    shareSection.tags.map((tag, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium rounded",
                                            children: tag
                                        }, index, false, {
                                            fileName: "[project]/components/roadmap/ShareSection.tsx",
                                            lineNumber: 37,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/roadmap/ShareSection.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/roadmap/ShareSection.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    shareSection.deliverables && shareSection.deliverables.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$DeliverableList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        deliverables: shareSection.deliverables,
                        title: "Deliverables",
                        weekNumber: weekNumber,
                        section: "share"
                    }, void 0, false, {
                        fileName: "[project]/components/roadmap/ShareSection.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/roadmap/ShareSection.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/roadmap/ShareSection.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/roadmap-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filterWeeks",
    ()=>filterWeeks,
    "formatDate",
    ()=>formatDate,
    "getAllResources",
    ()=>getAllResources,
    "getAllWeeks",
    ()=>getAllWeeks,
    "getPhaseByNumber",
    ()=>getPhaseByNumber,
    "getPhaseProgress",
    ()=>getPhaseProgress,
    "getResourceTypeColor",
    ()=>getResourceTypeColor,
    "getRoadmapProgress",
    ()=>getRoadmapProgress,
    "getWeekByNumber",
    ()=>getWeekByNumber,
    "getWeekProgress",
    ()=>getWeekProgress,
    "getWeekResources",
    ()=>getWeekResources,
    "getWeeksByStatus",
    ()=>getWeeksByStatus,
    "searchWeeks",
    ()=>searchWeeks
]);
function getAllWeeks(roadmap) {
    return roadmap.phases.flatMap((phase)=>phase.weeks);
}
function getWeekByNumber(roadmap, weekNumber) {
    return getAllWeeks(roadmap).find((week)=>week.weekNumber === weekNumber);
}
function getPhaseByNumber(roadmap, phaseNumber) {
    return roadmap.phases.find((phase)=>phase.phaseNumber === phaseNumber);
}
function getWeekResources(week) {
    const resources = [];
    // Resources from research section
    if (week.researchSection?.resources) {
        resources.push(...week.researchSection.resources);
    }
    // Resources from deep dive topics
    week.researchSection?.deepDiveTopics?.forEach((topic)=>{
        if (topic.suggestedResources) {
            resources.push(...topic.suggestedResources);
        }
        // Resources from subtasks
        topic.subtasks?.forEach((subtask)=>{
            if (subtask.suggestedResources) {
                resources.push(...subtask.suggestedResources);
            }
        });
    });
    return resources;
}
function getAllResources(roadmap) {
    const allResources = [];
    const seen = new Set();
    getAllWeeks(roadmap).forEach((week)=>{
        getWeekResources(week).forEach((resource)=>{
            const key = `${resource.title}-${resource.url || ''}`;
            if (!seen.has(key)) {
                seen.add(key);
                allResources.push(resource);
            }
        });
    });
    return allResources;
}
function getWeekProgress(week) {
    let completed = 0;
    let total = 0;
    const countDeliverables = (deliverables)=>{
        if (!deliverables) return;
        deliverables.forEach((d)=>{
            total++;
            if (d.isCompleted) completed++;
        });
    };
    // Count from build section
    countDeliverables(week.buildSection?.deliverables);
    // Count from research section
    countDeliverables(week.researchSection?.deliverables);
    // Count deep dive topics
    week.researchSection?.deepDiveTopics?.forEach((topic)=>{
        total++;
        if (topic.isCompleted) completed++;
        // Count subtasks
        topic.subtasks?.forEach((subtask)=>{
            total++;
            if (subtask.isCompleted) completed++;
        });
    });
    // Count from share section
    countDeliverables(week.shareSection?.deliverables);
    const percentage = total > 0 ? Math.round(completed / total * 100) : 0;
    return {
        completed,
        total,
        percentage
    };
}
function getPhaseProgress(phase) {
    let totalCompleted = 0;
    let totalItems = 0;
    phase.weeks.forEach((week)=>{
        const progress = getWeekProgress(week);
        totalCompleted += progress.completed;
        totalItems += progress.total;
    });
    const percentage = totalItems > 0 ? Math.round(totalCompleted / totalItems * 100) : 0;
    return {
        completed: totalCompleted,
        total: totalItems,
        percentage
    };
}
function getRoadmapProgress(roadmap) {
    let totalCompleted = 0;
    let totalItems = 0;
    roadmap.phases.forEach((phase)=>{
        const progress = getPhaseProgress(phase);
        totalCompleted += progress.completed;
        totalItems += progress.total;
    });
    const percentage = totalItems > 0 ? Math.round(totalCompleted / totalItems * 100) : 0;
    return {
        completed: totalCompleted,
        total: totalItems,
        percentage
    };
}
function searchWeeks(roadmap, searchTerm) {
    if (!searchTerm.trim()) {
        return getAllWeeks(roadmap);
    }
    const term = searchTerm.toLowerCase();
    return getAllWeeks(roadmap).filter((week)=>{
        // Search in week title and theme
        if (week.title.toLowerCase().includes(term) || week.theme.toLowerCase().includes(term)) {
            return true;
        }
        // Search in build section
        if (week.buildSection?.projectTitle.toLowerCase().includes(term)) {
            return true;
        }
        if (week.buildSection?.description.toLowerCase().includes(term)) {
            return true;
        }
        // Search in research topics
        if (week.researchSection?.deepDiveTopics?.some((topic)=>topic.description.toLowerCase().includes(term))) {
            return true;
        }
        // Search in share section
        if (week.shareSection?.artifactTitle.toLowerCase().includes(term)) {
            return true;
        }
        return false;
    });
}
function filterWeeks(roadmap, filters) {
    let weeks = getAllWeeks(roadmap);
    // Filter by phase
    if (filters.phase !== undefined) {
        weeks = weeks.filter((week)=>{
            const phase = roadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === week.weekNumber));
            return phase?.phaseNumber === filters.phase;
        });
    }
    // Filter by status
    if (filters.status) {
        weeks = weeks.filter((week)=>week.status === filters.status);
    }
    // Filter by search term
    if (filters.searchTerm) {
        weeks = searchWeeks({
            ...roadmap,
            phases: [
                {
                    phaseNumber: 0,
                    title: '',
                    summary: '',
                    weekRange: '',
                    weeks
                }
            ]
        }, filters.searchTerm);
    }
    return weeks;
}
function getResourceTypeColor(type) {
    const typeMap = {
        YouTube: 'bg-red-100 text-red-700',
        Article: 'bg-blue-100 text-blue-700',
        Guide: 'bg-green-100 text-green-700',
        Book: 'bg-purple-100 text-purple-700',
        Course: 'bg-orange-100 text-orange-700',
        Documentation: 'bg-gray-100 text-gray-700',
        Tool: 'bg-yellow-100 text-yellow-700',
        Paper: 'bg-indigo-100 text-indigo-700',
        Blog: 'bg-pink-100 text-pink-700',
        Platform: 'bg-teal-100 text-teal-700',
        Template: 'bg-cyan-100 text-cyan-700',
        Gallery: 'bg-violet-100 text-violet-700',
        Community: 'bg-emerald-100 text-emerald-700',
        Framework: 'bg-lime-100 text-lime-700',
        Podcast: 'bg-rose-100 text-rose-700',
        Networking: 'bg-amber-100 text-amber-700'
    };
    return typeMap[type] || 'bg-gray-100 text-gray-700';
}
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
function getWeeksByStatus(roadmap, status) {
    return getAllWeeks(roadmap).filter((week)=>week.status === status);
}
}),
"[project]/components/viewer/hybrid/HeroAction.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroAction",
    ()=>HeroAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-ssr] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
;
;
function HeroAction({ title, subtitle, type, onAction }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white shadow-xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/5 blur-3xl"
            }, void 0, false, {
                fileName: "[project]/components/viewer/hybrid/HeroAction.tsx",
                lineNumber: 13,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"
            }, void 0, false, {
                fileName: "[project]/components/viewer/hybrid/HeroAction.tsx",
                lineNumber: 14,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex items-center gap-2 text-orange-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                className: "h-4 w-4 fill-current"
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/hybrid/HeroAction.tsx",
                                lineNumber: 18,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-bold uppercase tracking-wider",
                                children: "Current Focus"
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/hybrid/HeroAction.tsx",
                                lineNumber: 19,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/hybrid/HeroAction.tsx",
                        lineNumber: 17,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mb-2 text-3xl font-bold leading-tight md:text-4xl",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/hybrid/HeroAction.tsx",
                        lineNumber: 22,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-8 max-w-2xl text-lg text-gray-300",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/hybrid/HeroAction.tsx",
                        lineNumber: 25,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onAction,
                                className: "group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-gray-900 transition-all hover:bg-gray-100 hover:shadow-lg active:scale-95",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Start Session"
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/hybrid/HeroAction.tsx",
                                        lineNumber: 34,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        className: "h-4 w-4 transition-transform group-hover:translate-x-1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/hybrid/HeroAction.tsx",
                                        lineNumber: 35,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/hybrid/HeroAction.tsx",
                                lineNumber: 30,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/hybrid/HeroAction.tsx",
                                        lineNumber: 39,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Mark Complete"
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/hybrid/HeroAction.tsx",
                                        lineNumber: 40,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/hybrid/HeroAction.tsx",
                                lineNumber: 38,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/hybrid/HeroAction.tsx",
                        lineNumber: 29,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/viewer/hybrid/HeroAction.tsx",
                lineNumber: 16,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/hybrid/HeroAction.tsx",
        lineNumber: 12,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/viewer/hybrid/CopilotSidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CopilotSidebar",
    ()=>CopilotSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
;
;
function CopilotSidebar() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-[calc(100vh-2rem)] flex-col rounded-2xl border border-border bg-surface shadow-xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-border p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-indigo-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                lineNumber: 8,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold",
                                children: "Compass AI"
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                lineNumber: 9,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                        lineNumber: 7,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-muted-foreground",
                        children: "Context-aware assistance for your current task."
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                        lineNumber: 11,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                lineNumber: 6,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-4 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-8 w-8 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    className: "h-4 w-4 text-indigo-600"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                    lineNumber: 20,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                lineNumber: 19,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 rounded-2xl rounded-tl-none bg-indigo-50 dark:bg-indigo-900/20 p-3 text-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "I noticed you're working on the ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "OpenAI API Integration"
                                        }, void 0, false, {
                                            fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                            lineNumber: 23,
                                            columnNumber: 60
                                        }, this),
                                        ". Would you like to see a boilerplate code snippet for the client setup?"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                    lineNumber: 23,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                lineNumber: 22,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                        lineNumber: 18,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 flex-row-reverse",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-8 w-8 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-bold",
                                    children: "ME"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                    lineNumber: 29,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                lineNumber: 28,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 rounded-2xl rounded-tr-none bg-gray-100 dark:bg-gray-800 p-3 text-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Yes, please show me how to handle the API key securely."
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                    lineNumber: 32,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                lineNumber: 31,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-8 w-8 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    className: "h-4 w-4 text-indigo-600"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                    lineNumber: 38,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                lineNumber: 37,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 rounded-2xl rounded-tl-none bg-indigo-50 dark:bg-indigo-900/20 p-3 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Here is a secure pattern using `python-dotenv`:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                        lineNumber: 41,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                        className: "mt-2 rounded bg-black/5 dark:bg-black/50 p-2 text-xs font-mono overflow-x-auto",
                                        children: `from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")`
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                        lineNumber: 42,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                lineNumber: 40,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                        lineNumber: 36,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                lineNumber: 16,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-border p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Ask for help...",
                            className: "w-full rounded-full border border-border bg-background py-2 pl-4 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                            lineNumber: 55,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "absolute right-1 top-1 rounded-full bg-indigo-500 p-1.5 text-white hover:bg-indigo-600",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                                lineNumber: 61,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                            lineNumber: 60,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                    lineNumber: 54,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
                lineNumber: 53,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/hybrid/CopilotSidebar.tsx",
        lineNumber: 5,
        columnNumber: 9
    }, this);
}
}),
"[project]/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/components/viewer/hybrid/ScrollFocusWrapper.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollFocusWrapper",
    ()=>ScrollFocusWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function ScrollFocusWrapper({ children, className, threshold = 0.5, defaultInFocus = false, rootMargin = '-20% 0px -20% 0px' }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isFocused, setIsFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultInFocus);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observer = new IntersectionObserver(([entry])=>{
            // Update focus state based on intersection ratio
            setIsFocused(entry.isIntersecting);
        }, {
            root: null,
            rootMargin: rootMargin,
            threshold: threshold
        });
        if (ref.current) {
            observer.observe(ref.current);
        }
        return ()=>{
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [
        threshold
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("transition-all duration-700 ease-in-out transform", isFocused ? "opacity-100 blur-0 scale-100 grayscale-0" : "opacity-40 blur-[2px] scale-95 grayscale", className),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/viewer/hybrid/ScrollFocusWrapper.tsx",
        lineNumber: 49,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/viewer/actions/BulkActionsBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BulkActionsBar",
    ()=>BulkActionsBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SelectionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/SelectionContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRoadmapMutations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useRoadmapMutations.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/progress/tracker.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function BulkActionsBar() {
    const { selectedIds, clearSelection, selectionCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SelectionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelection"])();
    const { removeDeliverable, removeResource, toggleDeliverable } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRoadmapMutations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRoadmapMutations"])();
    if (selectionCount === 0) return null;
    const handleDelete = async ()=>{
        if (window.confirm(`Are you sure you want to delete ${selectionCount} items?`)) {
            const ids = Array.from(selectedIds);
            // Sort IDs to handle deletions from end to start to avoid index shifting issues
            // We need to parse them first to get indices
            const parsedItems = ids.map((id)=>({
                    id,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseItemId"])(id)
                }));
            // Sort by index descending
            parsedItems.sort((a, b)=>b.index - a.index);
            for (const item of parsedItems){
                if (item.type === 'deliverable' && item.section) {
                    await removeDeliverable(item.weekNumber, item.section, item.index);
                } else if (item.type === 'resource' && item.topicIndex !== undefined) {
                    await removeResource(item.weekNumber, item.topicIndex, item.index);
                }
            }
            clearSelection();
        }
    };
    const handleMarkComplete = async ()=>{
        const ids = Array.from(selectedIds);
        const parsedItems = ids.map((id)=>({
                id,
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseItemId"])(id)
            }));
        for (const item of parsedItems){
            if (item.type === 'deliverable' && item.section) {
                await toggleDeliverable(item.weekNumber, item.section, item.index, true // Mark as completed
                );
            }
        }
        clearSelection();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-full px-6 py-3 flex items-center gap-4 border border-gray-200 dark:border-gray-700 z-50 animate-in slide-in-from-bottom-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 border-r border-gray-200 dark:border-gray-700 pr-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold text-gray-900 dark:text-gray-100",
                        children: selectionCount
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/actions/BulkActionsBar.tsx",
                        lineNumber: 65,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-gray-500 dark:text-gray-400",
                        children: "selected"
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/actions/BulkActionsBar.tsx",
                        lineNumber: 66,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/viewer/actions/BulkActionsBar.tsx",
                lineNumber: 64,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleMarkComplete,
                        className: "p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full transition-colors",
                        title: "Mark as Complete",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/actions/BulkActionsBar.tsx",
                            lineNumber: 75,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/actions/BulkActionsBar.tsx",
                        lineNumber: 70,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleDelete,
                        className: "p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors",
                        title: "Delete Selected",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/actions/BulkActionsBar.tsx",
                            lineNumber: 82,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/actions/BulkActionsBar.tsx",
                        lineNumber: 77,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/viewer/actions/BulkActionsBar.tsx",
                lineNumber: 69,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-l border-gray-200 dark:border-gray-700 pl-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: clearSelection,
                    className: "p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "w-4 h-4"
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/actions/BulkActionsBar.tsx",
                        lineNumber: 91,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/viewer/actions/BulkActionsBar.tsx",
                    lineNumber: 87,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/actions/BulkActionsBar.tsx",
                lineNumber: 86,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/actions/BulkActionsBar.tsx",
        lineNumber: 63,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/viewer/controls/SelectionToggle.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectionToggle",
    ()=>SelectionToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-check-big.js [app-ssr] (ecmascript) <export default as CheckSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SelectionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/SelectionContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function SelectionToggle() {
    const { isSelectionMode, toggleSelectionMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SelectionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelection"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: toggleSelectionMode,
        className: `
        flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all
        ${isSelectionMode ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'}
      `,
        "aria-label": isSelectionMode ? 'Cancel selection' : 'Select items',
        children: isSelectionMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/components/viewer/controls/SelectionToggle.tsx",
                    lineNumber: 23,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Cancel Selection"
                }, void 0, false, {
                    fileName: "[project]/components/viewer/controls/SelectionToggle.tsx",
                    lineNumber: 24,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/components/viewer/controls/SelectionToggle.tsx",
                    lineNumber: 28,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Select Items"
                }, void 0, false, {
                    fileName: "[project]/components/viewer/controls/SelectionToggle.tsx",
                    lineNumber: 29,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/viewer/controls/SelectionToggle.tsx",
        lineNumber: 10,
        columnNumber: 9
    }, this);
}
}),
"[project]/app/viewer/week/[number]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WeekPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$RoadmapContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/RoadmapContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$roadmap$2f$BuildSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/roadmap/BuildSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$roadmap$2f$ResearchSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/roadmap/ResearchSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$roadmap$2f$ShareSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/roadmap/ShareSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$roadmap$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/roadmap-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$hybrid$2f$HeroAction$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/hybrid/HeroAction.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$hybrid$2f$CopilotSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/hybrid/CopilotSidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$hybrid$2f$ScrollFocusWrapper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/hybrid/ScrollFocusWrapper.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SelectionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/SelectionContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$BulkActionsBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/actions/BulkActionsBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$controls$2f$SelectionToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/controls/SelectionToggle.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function WeekPage({ params }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { roadmap } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$RoadmapContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRoadmap"])();
    const resolvedParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(params);
    const weekNumber = parseInt(resolvedParams.number);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!roadmap) {
            router.push('/');
        }
    }, [
        roadmap,
        router
    ]);
    if (!roadmap) {
        return null;
    }
    const week = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$roadmap$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWeekByNumber"])(roadmap, weekNumber);
    if (!week) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-text-primary mb-4",
                        children: "Week not found"
                    }, void 0, false, {
                        fileName: "[project]/app/viewer/week/[number]/page.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/viewer",
                        className: "text-primary hover:underline",
                        children: "Back to overview"
                    }, void 0, false, {
                        fileName: "[project]/app/viewer/week/[number]/page.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/viewer/week/[number]/page.tsx",
                lineNumber: 42,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/viewer/week/[number]/page.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this);
    }
    // Find the phase this week belongs to
    const phase = roadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SelectionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectionProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 dark:bg-gray-950 p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[1800px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/viewer",
                                    className: "inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, this),
                                        "Back to overview"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$controls$2f$SelectionToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectionToggle"], {}, void 0, false, {
                                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 xl:grid-cols-12 gap-8 items-start",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "xl:col-span-8 pb-32",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-20",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$hybrid$2f$HeroAction$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeroAction"], {
                                                title: week.title,
                                                subtitle: week.theme,
                                                type: "build",
                                                onAction: ()=>{}
                                            }, void 0, false, {
                                                fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                lineNumber: 79,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                            lineNumber: 78,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-16",
                                            children: [
                                                week.buildSection && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$hybrid$2f$ScrollFocusWrapper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollFocusWrapper"], {
                                                    className: "relative transition-all duration-500",
                                                    defaultInFocus: true,
                                                    rootMargin: "-5% 0px -20% 0px",
                                                    threshold: 0.1,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-transparent opacity-20 rounded-full hidden xl:block"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                            lineNumber: 96,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mb-6 flex items-center justify-between",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider",
                                                                            children: "Build Phase"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                                            lineNumber: 99,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm text-gray-500",
                                                                            children: [
                                                                                week.buildSection.hours,
                                                                                "h estimated"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                                            lineNumber: 102,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                                    lineNumber: 98,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$roadmap$2f$BuildSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    buildSection: week.buildSection,
                                                                    weekNumber: weekNumber
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                                    lineNumber: 105,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                            lineNumber: 97,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 19
                                                }, this),
                                                week.researchSection && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$hybrid$2f$ScrollFocusWrapper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollFocusWrapper"], {
                                                    className: "relative transition-all duration-500",
                                                    threshold: 0.1,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-transparent opacity-20 rounded-full hidden xl:block"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                            lineNumber: 119,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mb-6 flex items-center justify-between",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider",
                                                                            children: "Research Phase"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                                            lineNumber: 122,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm text-gray-500",
                                                                            children: [
                                                                                week.researchSection.hours,
                                                                                "h estimated"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                                            lineNumber: 125,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                                    lineNumber: 121,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$roadmap$2f$ResearchSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    researchSection: week.researchSection,
                                                                    weekNumber: weekNumber
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                                    lineNumber: 128,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                            lineNumber: 120,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 19
                                                }, this),
                                                week.shareSection && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$hybrid$2f$ScrollFocusWrapper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollFocusWrapper"], {
                                                    className: "relative transition-all duration-500",
                                                    threshold: 0.1,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-transparent opacity-20 rounded-full hidden xl:block"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                            lineNumber: 142,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mb-6 flex items-center justify-between",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider",
                                                                            children: "Share Phase"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                                            lineNumber: 145,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm text-gray-500",
                                                                            children: [
                                                                                week.shareSection.hours,
                                                                                "h estimated"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                                            lineNumber: 148,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                                    lineNumber: 144,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$roadmap$2f$ShareSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    shareSection: week.shareSection,
                                                                    weekNumber: weekNumber
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                                    lineNumber: 151,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                            lineNumber: 143,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between pt-12",
                                                    children: [
                                                        weekNumber > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `/viewer/week/${weekNumber - 1}`,
                                                            className: "flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 shadow-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                                    lineNumber: 166,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Week ",
                                                                weekNumber - 1
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                            lineNumber: 170,
                                                            columnNumber: 19
                                                        }, this),
                                                        weekNumber < roadmap.totalDurationWeeks && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `/viewer/week/${weekNumber + 1}`,
                                                            className: "flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20",
                                                            children: [
                                                                "Week ",
                                                                weekNumber + 1,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                                    className: "w-4 h-4 rotate-180"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                                    lineNumber: 177,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                            lineNumber: 172,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                            lineNumber: 87,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden xl:flex xl:col-span-4 flex-col gap-6 sticky top-8 h-[calc(100vh-4rem)]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$hybrid$2f$CopilotSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CopilotSidebar"], {}, void 0, false, {
                                        fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                        lineNumber: 187,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/viewer/week/[number]/page.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$BulkActionsBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BulkActionsBar"], {}, void 0, false, {
                    fileName: "[project]/app/viewer/week/[number]/page.tsx",
                    lineNumber: 193,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/viewer/week/[number]/page.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/viewer/week/[number]/page.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_c804a263._.js.map