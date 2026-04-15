import React from 'react'

const Footer = ({completedTasksCount = 0, activeTasksCount = 3}) => {
  return <>
    {completedTasksCount + activeTasksCount > 0 && (
      <div className='text-center'>
        <p className='text-sm text-foreground'>
          {
            completedTasksCount > 0 && (
              <>
                🎉 Congratulations! You have finished {completedTasksCount} tasks
                {
                  activeTasksCount > 0 && ` .Only ${activeTasksCount} tasks left. Keep going!`
                }
              </>
            )
          }

          {completedTasksCount === 0 && activeTasksCount > 0 && (
            <>
              Let's start working on {activeTasksCount} active tasks. One by one, you can do it!
            </>
          )}
        </p>
      </div>
    )}
  </>
}

export default Footer