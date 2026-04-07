import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({ filter }) => {
    return (
        <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
            <div className='space-y-3'>
                <Circle className='mx-auto size-12 text-muted-foreground' />

                <div>
                    <h3 className='font-medium text-foreground'>
                        {
                            filter === "active"
                                ? "There is no ongoing tasks"
                                : filter === "completed"
                                    ? "There is no completed tasks"
                                    : "There is no tasks added yet"
                        }
                    </h3>

                    <p className='text-sm text-muted-foreground'>
                        {filter === "all" ? "Add the first task to start!"
                            : `Change to "All" to see the ${filter === 'active' ? 'completed' : 'ongoing'} tasks`}
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default TaskEmptyState