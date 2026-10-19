<main class="centered">
    <header class="centered">
        <h1>About Me</h1>
        <img src="images/IMG_9426.jpg" alt="Me standing by the shore">
    </header>
        <p>Hello and welcome to my page! My name is Chang Chi Hua, but you can call me Ethan.</p>
        <p>I'm originally from Taiwan and currently based in Seattle, where I'm pursuing my Master's in Computer Science at Northeastern University.</p>
    <section class="centered">
        <h2>My background</h2>
        <div>
            <img src="/images/IMG_4835.jpg" alt="Me troubleshooting the electrical panel">
            <img src="/images/IMG_5615.jpg" alt="Me standing next to HV transformer">
        </div>

        <p>
            My path into software engineering wasn't exactly traditional. Before coming to Northeastern, I spent about two years working as an Electrical Engineer in the power generation industry, supporting combined-cycle power plant projects with Hyundai Engineering and Mitsubishi-related engineering teams. I worked on electrical equipment testing and commissioning, medium-voltage power systems, transformers, UPS and emergency power systems, as well as industrial control and monitoring systems. I was also involved in electrical isolation, Lockout/Tagout (LOTO), and commissioning procedures where safety, precision, and communication across engineering teams were critical.
            That experience shaped the way I approach technical problems today. Working with large-scale industrial systems taught me to think beyond individual components and understand how different parts interact as a whole. I enjoy troubleshooting complex problems, finding the root cause, and building solutions that are reliable in the real world.
        </p>
    </section>
    <section class="centered">
        <h3>Transitioning to Software</h3>
        <img src="/images/IMG_6517.jpg" alt="power plant's control room">
        <p>
            That mindset eventually led me to make the transition into Computer Science and Software Engineering. At Northeastern, I've been developing a broader understanding of software design, algorithms, data management, system architecture, full-stack development, and the software development lifecycle. I'm particularly interested in building practical software and exploring how AI can be integrated into the way we design, develop, and use software.
            What I enjoy most about software is the ability to turn an idea into something people can actually use. I like working through the entire process, from understanding a problem and designing a solution to implementing it, debugging it, and improving it along the way. I'm still learning every day, but my engineering background gives me a different perspective on problem-solving, especially when it comes to understanding complex systems and thinking about reliability and real-world constraints.
        </p>
    </section>
    <section class="centered">
        <h4>Outside of Work</h4>
        <div>
            <img src="/images/IMG_3268.jpg" alt="Me and my girlfriend at the Siesta Key in Florida">
            <img src="/images/IMG_4182.jpg" alt="Me cosplaying as Toji from jjk during a comic con with homelander">
        </div>
        
            <p>
                Outside of school and coding, I like to stay active. You'll usually find me working out, skiing, hiking, playing sports, or exploring Seattle. I also enjoy discovering new restaurants and places around the city and spending time with friends.
                Moving from Taiwan to the U.S. and making a career transition from electrical engineering to software engineering has been a major change, but also one of the most rewarding experiences I've had. I'm excited to keep learning, build things that are useful, and see where this next chapter takes me.
            </p>
    </section>
</main>
<footer>
    <p>&copy; 2026 Chang Chi (Ethan) Hua</p>
</footer>

<style>
    img{
    width: 50%;
    height: auto;
}

h2{
    font-size: 1.5rem;
}
h3{
    font-size: 1.5rem;
}
h4{
    font-size: 1.5rem;
}

section div{
    display: flex;
    justify-content: center;
    gap:10px;
}


section p{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:6px;
    width: 90vw;
}

@media (min-width:864px){
    img{
        width:20%;
        height: auto;
    }
    section p{
        width: 70vw;
    }
    h2{
        font-size: 2rem;
    }
    h3{
        font-size: 2rem;
    }
    h4{
        font-size: 2rem;
    }
}

</style>