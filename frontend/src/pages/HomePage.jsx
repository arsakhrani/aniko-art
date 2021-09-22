import React from 'react'
import Header from "../components/header/Header";
import InteractiveMap from '../components/sections/homepage/InteractiveMap';
import InteractiveMapTwo from '../components/sections/homepage/InteractiveMapTwo';

export default function HomePage() {
    return (
        <div>
            <Header/>
            <InteractiveMapTwo />
        </div>
    )
}
