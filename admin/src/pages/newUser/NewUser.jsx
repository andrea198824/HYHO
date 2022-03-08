import "./newUser.css";

export default function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Nuevo Usuario</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Nombre de Usuario</label>
          <input type="text" placeholder="usuario" />
        </div>
        <div className="newUserItem">
          <label>Nombre Completo</label>
          <input type="text" placeholder="nombre" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="xxxx@xxxxx.com" />
        </div>
        <div className="newUserItem">
          <label>Contraseña</label>
          <input type="password" placeholder="password" />
        </div>
        <div className="newUserItem">
          <label>Telefono</label>
          <input type="text" placeholder="+1 11 1111 11" />
        </div>
        <div className="newUserItem">
          <label>Direccion</label>
          <input type="text" placeholder="CABA | Buenos Aires" />
        </div>
        <div className="newUserItem">
          <label>Genero</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Hombre</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Mujer</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Otro</label>
          </div>
        </div>
        <button className="newUserButton">Crear</button>
      </form>
    </div>
  );
}
