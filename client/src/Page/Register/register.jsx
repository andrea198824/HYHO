import { useState } from "react";


const Register = () => {
    const [register, setRegister] = useState({
        user: "",
        password: "",
        passwordVeri: "",
    })

    const onChanges = (e) => {
        setRegister({ [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form>
                <label for='user'> Usuario: </label>
                <input
                    id='user'
                    name="user"
                    value={register.user}
                    onChange={onChanges}
                />
                <br />

                <label for='password'> Contraseña: </label>
                <input
                    type='password'
                    id='password'
                    name="password"
                    value={register.password}
                    onChange={onChanges}
                />
                <br />

                <label for='passwordVeri'> Repetir Contraseña: </label>
                <input
                    type='password'
                    id='passwordVeri'
                    name="passwordVeri"
                    value={register.passwordVeri}
                    onChange={onChanges}
                />
                <br />

                <button type="submit"> Registrarse </button>
            </form>
        </div>
    )
}

export default Register;