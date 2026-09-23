import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [imageError, setImageError] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?'

  return (
    <div className='relative space-y-2 text-center'>
      {user && (
        <div className='absolute right-0 top-0'>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type='button'
                className='flex size-9 items-center justify-center overflow-hidden rounded-full bg-muted text-xs font-medium text-foreground ring-1 ring-foreground/10'
              >
                {user.picture && !imageError ? (
                  <img
                    src={user.picture}
                    alt={user.name || user.email}
                    className='size-full object-cover'
                    onError={() => setImageError(true)}
                  />
                ) : (
                  initials
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent align='end' className='w-56'>
              <div className='space-y-0.5 px-1 py-1'>
                <p className='truncate text-sm font-medium text-foreground'>{user.name}</p>
                <p className='truncate text-xs text-muted-foreground'>{user.email}</p>
              </div>
              <Button variant='ghost' size='sm' className='w-full justify-start' onClick={handleLogout}>
                Log out
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      )}

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
