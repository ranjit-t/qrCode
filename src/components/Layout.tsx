import styled from "@emotion/styled";

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin: 0 auto;
    width: 100vw;
    box-sizing: border-box;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <StyledLayout>
      <div className="content">{children}</div>
    </StyledLayout>
  );
};

export default Layout;
