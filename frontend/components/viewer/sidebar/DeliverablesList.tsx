'use client';

import React from 'react';
import DeliverableList from '@/components/ui/DeliverableList';
import type { Deliverable } from '@/lib/types';

interface DeliverablesListProps {
    deliverables: Deliverable[];
    weekNumber: number;
}

export function DeliverablesList({ deliverables, weekNumber }: DeliverablesListProps) {
    return (
        <div className="bg-surface rounded-lg p-5 border border-border shadow-sm">
            <DeliverableList
                deliverables={deliverables}
                title="Deliverables"
                weekNumber={weekNumber}
                section="build"
            />
        </div>
    );
}
