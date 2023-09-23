# PokeAPI App using React + TypeScript + Vite

This is an app I've developed as an exercise to learn React.

Being set-up with Vite you may clone this project and install it with `npm i`, then
launch it with `npm run dev`.

I wanted to show each array within IPokemonDataLists type as a table row with multiple <span> elements.
But each array is a list of a different object type with an unique property of a type called INamedAPIResource that has a property "name" that I actaully wanted to display.
One of the arrays actually is a list of INamedAPIResource objects itself.

For that, I wrote parseListObject function in Pokemon.tsx file that access the property that contains the desired INamedAPIResource with an "as" alias.
There might be a simpler way to do that, but I'm proud of what I've achieved so far 😄

Regards,
Jhonatan (uoyj @ Github)