import Default from '../templates/Default'
import FormLogin from '../components/forms/FormLogin'

export default function Login() {
  return (
    <Default className="flex flex-col items-center justify-center">
      <div className="">
        <FormLogin />
      </div>
    </Default>
  )
}