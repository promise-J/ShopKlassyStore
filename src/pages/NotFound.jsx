import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  fontsize: 50px;
`

const NotFound = () => {
    return (
        <Container>
            <h1>Page is not Found</h1>
        </Container>
    )
}

export default NotFound
