import React from 'react'

const Header = () => {
  return (
    <div className='space-y-2 text-center'>
      <h1 className='text-4xl font-bold text-transparent bg-primary bg-clip-text'>
        Todo-bot
      </h1>

      <p className='text-foreground'>
        Keep your tasks running like a bot
      </p>
    </div>
  )
}

export default Header