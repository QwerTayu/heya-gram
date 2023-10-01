import NavBar from '@/pages/components/navbar'
import React from 'react'
import MainContainer from '@/pages/components/mainContainer'

function home() {
    return (
        <MainContainer>
            {/* コンテンツ */}
            <NavBar />
        </MainContainer>
    )
}

export default home