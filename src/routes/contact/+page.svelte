<main class="centered">
    <header>
        <h1>Contact Me</h1>
    </header>

    <ul>
        <li class="red"><a href="mailto:ethanhua052@gmail.com">Email</a></li>
        <li class="blue"><a href="https://www.linkedin.com/in/chang-chi-hua-4b0739268/">LinkedIn</a></li>
        <li class="black"><a href="https://github.com/Hcckii">Github</a></li>
    </ul>
    <img src="/images/sasun-bughdaryan-FzSGR5YbyFw-unsplash.jpg" alt="contact me">
</main>
<footer>
    <p>&copy; 2026 Chang Chi (Ethan) Hua</p>
</footer>

<style>
h1{
    margin:20px;
    font-size: clamp(2.2rem, 7vw, 3.5rem);
    font-weight: bold;
    color: var(--color-title);

}
main ul{
    display: flex;
    justify-content: center;
    list-style: none;
    gap:20px;
    padding: 0;
    margin: 0;
}
a {
    color:inherit;
    text-decoration: none;
    transition: background-color 0.2s;
}
ul li{
    font-weight: bold;
    font-size: 20px;
    padding:5px;
    border-radius: 10px;
}
.blue{
    background-color: rgb(0, 119, 181);
    color:white;
    border:2px solid black;
}
.red{
    background-color: rgb(193, 154, 107);
    color: rgb(255, 255, 255);
    border: 2px solid rgb(186, 2, 2);
}
.black{
    background-color: var(--color-title);
    color:white;
    border:2px solid black;
}
img{
    width:80vw;
    height: auto;
    margin:20px;
    border-radius: 30px;
}
@media (min-width:864px) {
    img{
        width:60vw;
    }
    
}
</style>
