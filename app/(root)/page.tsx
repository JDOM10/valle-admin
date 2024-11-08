import Navbar from "@/components/navbar"
import { UserButton } from "@clerk/nextjs"

const SetupPage = () => {
  return (
    <div className="p-4">
      <UserButton afterSignOutUrl="/" />
      <Navbar/>
    </div>
  )
}

export default SetupPage