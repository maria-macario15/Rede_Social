import style from '../components/style.css'

function navbar() {
    return (
        <main>
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <img src=".../Apresentaçãofinal.png" width="8%" />
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                        <button class="btn btn-outline-dark" type="submit">Achar</button>
                    </form>
                </div>
            </nav>
            <div>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="amigos">Amigos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="feed">Feed</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="conversa">Conversas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="grupos">Grupos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="salvos">Salvos</a>
                    </li>
                </ul>
            </div>




        </main>
    );
}

export default navbar;