import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserIcon } from "lucide-react"


const UserProfileImage = ({imageWidth}) =>(
 <Avatar
    style={{
      width: `${imageWidth}px`,
      height: `${imageWidth}px`,
    }}
    className="flex place-content-center items-center"
  >
    <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="border-primary-main"><UserIcon color="#091e54" /></AvatarFallback>

  </Avatar>
)

export default UserProfileImage