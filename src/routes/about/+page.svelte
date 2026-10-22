<script>
	const facts = [
		{ label: 'Based in', value: 'Seattle, WA' },
		{ label: 'Studying', value: 'M.S. Computer Science, Northeastern University (expected 2028)' },
		{ label: 'Previously', value: 'Commissioning software/electrical engineer, power generation' }
	];

	const experience = [
		{
			period: '2023 – 2025',
			title: 'Commissioning Software/Electrical Engineer',
			place: 'Mitsubishi · Hyundai Engineering · GE · Taiwan',
			highlights: [
				'Developed and debugged C/Python-based control logic for industrial power systems, tracing root causes to improve reliability.',
				'Ran end-to-end commissioning and functional testing, validating control sequences, interlocks, and signal flows across integrated subsystems.',
				'Investigated equipment and control failures through structured testing and root cause analysis.',
				'Worked in English with engineering teams from Korea, Japan, India, and Taiwan in safety-critical environments.'
			]
		}
	];

	const education = [
		{
			period: 'Expected May 2028',
			title: 'M.S. Computer Science',
			place: 'Northeastern University · Seattle, WA'
		},
		{
			period: '2018-2023',
			title: 'B.S. Electronic Engineering',
			place: 'Southern Taiwan University of Science and Technology'
		},
        {
            period: '2018',
            title: 'Computer Science',
            place: 'Shin Shing HighSchool Taiwan, Taoyuan City'
        }
	];

	const skills = [
		{ group: 'Languages', items: ['Java', 'Python', 'C', 'JavaScript', 'SQL', 'HTML5', 'CSS'] },
		{
			group: 'Web & Backend',
			items: ['Node.js', 'Express', 'Svelte', 'REST APIs', 'WebSockets', 'npm']
		},
		{ group: 'Databases', items: ['MongoDB', 'Relational design', 'Indexing', 'Transactions'] },
		{
			group: 'Engineering Practice',
			items: ['Git', 'Linux', 'Docker', 'CI/CD', 'JUnit', 'pytest']
		},
		{ group: 'Industrial', items: ['GE Mark VIe', 'DCDAS'] }
	];

	const projects = [
		{
			name: 'Arcade',
			stack: 'SvelteKit · JavaScript · npm',
			description:
				'This website. The 2048 logic is my own npm package, @ethanhua/arcade-core: pure, framework-agnostic functions consumed by the app as a versioned dependency. Includes a CSS-only crossword and full keyboard and screen reader support.',
			links: [
				{ label: 'Play 2048', href: '/games/2048' },
				{ label: 'npm package', href: 'https://www.npmjs.com/package/@ethanhua/arcade-core' }
			]
		},
		{
			name: 'Gomoku AI',
			stack: 'Python · Processing · pytest',
			description:
				'A playable Gomoku game with an AI opponent at three difficulty levels. The strongest mode scores board positions and looks ahead to win or block; game logic is modular and unit tested.',
			links: [{ label: 'GitHub', href: 'https://github.com/Hcckii' }]
		}
	];
</script>

<svelte:head>
	<title>About | Ethan Hua</title>
</svelte:head>

<main class="about">
	<section class="intro">
		<img
			class="portrait"
			src="/images/IMG_9426.jpg"
			alt="Ethan standing by the shore"
			width="240"
			height="240"
		/>
		<div>
			<h1>A Little About Me...</h1>
			<p class="lead">
				A software engineer with a background in commissioning industrial power systems. I like
				understanding how complex systems fit together, and building reliable software people
				can actually use.
			</p>
			<dl class="facts">
				{#each facts as fact (fact.label)}
					<div>
						<dt>{fact.label}</dt>
						<dd>{fact.value}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</section>

	<section>
		<h2>Experience</h2>
		<ol class="timeline">
			{#each experience as job (job.title)}
				<li>
					<p class="period">{job.period}</p>
					<h3>{job.title}</h3>
					<p class="place">{job.place}</p>
					<ul class="highlights">
						{#each job.highlights as point (point)}
							<li>{point}</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ol>
	</section>

	<section>
		<h2>From power plants to software</h2>
		<div class="photos">
			<img src="/images/IMG_4835.jpg" alt="Ethan troubleshooting an electrical panel" loading="lazy" />
			<img
				src="/images/IMG_5615.jpg"
				alt="Ethan standing next to a high-voltage transformer"
				loading="lazy"
			/>
			<img src="/images/IMG_6517.jpg" alt="A power plant control room" loading="lazy" />
		</div>
		<p>
			Commissioning taught me to think beyond individual components: a single control signal can
			ripple through an entire plant. I spent my days tracing logic, testing interlocks, and
			finding root causes in environments where precision and clear communication mattered.
		</p>
		<p>
			Writing and debugging control logic is what pulled me toward software. Now I'm building on
			that foundation with computer science, and I'm especially interested in practical systems
			and how AI is changing the way software is designed and built.
		</p>
	</section>

	<section>
		<h2>Projects</h2>
		<div class="projects">
			{#each projects as project (project.name)}
				<article class="project">
					<h3>{project.name}</h3>
					<p class="stack">{project.stack}</p>
					<p>{project.description}</p>
					<ul class="project-links">
						{#each project.links as link (link.href)}
							<li><a href={link.href}>{link.label}</a></li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>
	</section>

	<section>
		<h2>Skills</h2>
		<div class="skills">
			{#each skills as skill (skill.group)}
				<div class="skill-group">
					<h3>{skill.group}</h3>
					<ul>
						{#each skill.items as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<section>
		<h2>Education</h2>
		<ol class="timeline">
			{#each education as school (school.title)}
				<li>
					<p class="period">{school.period}</p>
					<h3>{school.title}</h3>
					<p class="place">{school.place}</p>
				</li>
			{/each}
		</ol>
	</section>

	<section>
		<h2>Outside of work</h2>
		<div class="photos">
			<img
				src="/images/IMG_3268.jpg"
				alt="Ethan and his girlfriend at Siesta Key, Florida"
				loading="lazy"
			/>
			<img
				src="/images/IMG_4182.jpg"
				alt="Ethan cosplaying as Toji from Jujutsu Kaisen at a comic con, next to a Homelander cosplayer"
				loading="lazy"
			/>
		</div>
		<p>
			You'll usually find me working out, skiing, hiking, playing sports, or exploring new
			restaurants around Seattle with friends.(also a huge gamer, shoot me a message if ya down to game!) 
            Moving from Taiwan to the U.S. and changing careers has been a big shift, and one of the most rewarding things I've done.
		</p>
	</section>

	<section class="cta">
		<h2>Let's talk</h2>
		<p>I'm always happy to connect about software, engineering, or opportunities.</p>
		<a class="button" href="/contact">Get in touch</a>
	</section>
</main>

<footer>
	<p>&copy; 2026 Chang Chi (Ethan) Hua</p>
</footer>

<style>
	.about {
		max-width: 960px;
		margin: 0 auto;
		padding: 2rem 1rem;
		display: grid;
		gap: 3rem;
	}

	h1 {
		font-size: clamp(2rem, 6vw, 3rem);
		margin: 0 0 0.5rem;
	}
	h2 {
		font-size: clamp(1.5rem, 4vw, 2rem);
		margin: 0 0 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid var(--color-title);
	}
	h3 {
		font-size: 1.15rem;
		margin: 0;
	}
	p {
		max-width: 65ch;
		line-height: 1.7;
	}

	.intro {
		display: grid;
		gap: 2rem;
		align-items: center;
	}
	.portrait {
		width: min(240px, 60vw);
		height: auto;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: 50%;
		justify-self: center;
	}
	.lead {
		font-size: 1.15rem;
	}

	.facts {
		display: grid;
		gap: 0.75rem;
		margin: 1.5rem 0 0;
	}
	.facts dt,
	.period {
		font-size: 0.85rem;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.facts dd {
		margin: 0;
	}

	.timeline {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1.5rem;
	}
	.timeline > li {
		padding-left: 1.25rem;
		border-left: 3px solid var(--color-title);
	}
	.timeline p {
		margin: 0.25rem 0;
	}
	.place,
	.stack {
		font-style: italic;
	}
	.highlights {
		margin: 0.75rem 0 0;
		padding-left: 1.25rem;
		display: grid;
		gap: 0.5rem;
		max-width: 65ch;
		line-height: 1.6;
	}

	.photos {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 1rem;
	}
	.photos img {
		width: 100%;
		height: auto;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		border-radius: 10px;
	}

	.projects {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}
	.project {
		padding: 1.25rem;
		border: 1px solid var(--color-title);
		border-radius: 10px;
	}
	.project p {
		margin: 0.5rem 0;
	}
	.project-links {
		list-style: none;
		padding: 0;
		margin: 0.75rem 0 0;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.skills {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
	}
	.skill-group ul {
		list-style: none;
		padding: 0;
		margin: 0.5rem 0 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.skill-group li {
		padding: 0.25rem 0.75rem;
		border-radius: 999px;
		border: 1px solid var(--color-title);
		font-size: 0.9rem;
	}

	.cta {
		text-align: center;
	}
	.cta p {
		margin: 0 auto 1rem;
	}
	.button {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 10px;
		background-color: var(--color-title);
		color: white;
		font-weight: bold;
		text-decoration: none;
	}
	a:focus-visible {
		outline: 3px solid var(--color-focus);
		outline-offset: 2px;
	}

	@media (min-width: 864px) {
		.intro {
			grid-template-columns: auto 1fr;
		}
	}
</style>