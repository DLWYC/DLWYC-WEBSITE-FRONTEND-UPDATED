import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/userdashboard/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/userdashboard/profile"!</div>
}
