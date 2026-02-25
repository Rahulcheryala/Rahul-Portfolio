import dayjs from 'dayjs'

import Image from 'next/image'
import { navIcons, navLinks } from '@/constants'

const Navbar = () => {
  return (
    <nav>
      <div>
        <Image src="/images/logo.svg" width={16} height={16} alt="logo" />
        <p className='font-bold'>Rahul's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img, name }) => (
            <li key={id}>
              <Image src={img} className='icon-hover' alt={`${name}-icon`} width={16} height={16} />
            </li>
          ))}
        </ul>

        <time>{dayjs().format('ddd D MMM h:mm A')}</time>
      </div>

    </nav>
  )
}

export default Navbar
