import axios from "axios";

interface ISignUpProps {
  username: FormDataEntryValue;
  password: FormDataEntryValue;
  email: FormDataEntryValue;
  phone: FormDataEntryValue;
  whatsapp: boolean;
}

export default async function signUp(user: ISignUpProps) {
  try {
    const token = await axios.post("http://localhost:3333/api/users", user);
    return token.data as string;
  } catch (err: any) {
    console.log(err.response.data); // IMPLEMENT THIS
  }
}
