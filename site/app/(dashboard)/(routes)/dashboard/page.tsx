import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { UserButton } from '@clerk/nextjs'
const DashboardPage = () => {
  return (
    <div>
      <Button size="lg">click fuxk</Button>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}

export default DashboardPage
