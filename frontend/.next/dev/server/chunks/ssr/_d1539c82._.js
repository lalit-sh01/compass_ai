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
];

//# sourceMappingURL=_d1539c82._.js.map