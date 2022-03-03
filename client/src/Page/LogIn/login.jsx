import { useState } from "react";

const Login = () => {
    const [login, setLogin] = useState({
        user: "",
        password: "",
    })

    const onChanges = (e) => {
        setLogin({ [e.target.name]: e.target.value })
    }



    return (
        <div>
            <form>
                <label for='user'> Usuario: </label>
                <input
                    id='user'
                    name="user"
                    value={login.user}
                    onChange={onChanges}
                />
                <br />

                <label label for='password'> Contraseña: </label>
                <input
                    type='password'
                    id='password'
                    name="password"
                    value={login.password}
                    onChange={onChanges}
                />
                <br />

                <button type="submit"> Iniciar Sesion </button>
            </form>
        </div>
    )
}

export default Login;