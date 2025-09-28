import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserIcon } from "lucide-react"


const UserProfileImage = ({imageWidth, profilePicture, className}) =>(
 <Avatar
    style={{
      width: `${imageWidth}px`,
      height: `${imageWidth}px`,
    }}
    className={`flex place-content-center items-center ${className}`}
  >
    <AvatarImage src={profilePicture} />
        <AvatarFallback className="border-primary-main"><UserIcon color="#091e54" /></AvatarFallback>

  </Avatar>
)

export default UserProfileImage