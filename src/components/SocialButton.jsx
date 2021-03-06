import { useScript } from "../hooks/useScript";
import styled from "styled-components";
import { useEffect } from "react";

import { FacebookShareButton, FacebookIcon } from "react-share";
import { TwitterShareButton, TwitterIcon } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import kakaoLogo from "./images/kakao.png";

const KakaoShareButton = styled.a`
  cursor: pointer;
`;

const KakaoIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

// 버튼별로 40px을 확보하고, 각 영역 간에는 8px의 간격을 둠.
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 48px);
  grid-column-gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
`;

// Style을 적용한 버튼 컴포넌트 추가
const URLShareButton = styled.button`
  width: 48px;
  height: 48px;
  color: white;
  border-radius: 24px;
  border: 0px;
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
  background-color: ${(props) => props.theme.primaryColor100};
  &:hover {
    background-color: ${(props) => props.theme.primaryColor80};
  }
`;

const SocialButtonGroup = () => {
  // window 객체에서 현재 url 가져오기
  const currentUrl = window.location.href;

  // kakao script 가져오기
  const status1 = useScript("https://developers.kakao.com/sdk/js/kakao.js");
  // kakao sdk 초기화하기
  // status가 변경될 때마다 실행되며, status가 ready일 때 초기화를 시도합니다.
  useEffect(() => {
    if (status1 === "ready" && window.Kakao) {
      // 중복 initialization 방지
      if (!window.Kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        window.Kakao.init("d2f8bffda79329fc9278a8bed23d88da");
      }
    }
  }, [status1]);

  const handleKakaoButton = () => {
    console.log("kakao share url", currentUrl);
    window.Kakao.Link.sendScrap({
      requestUrl: currentUrl,
    });
  };

  return (
    <GridContainer>
      <FacebookShareButton url={currentUrl}>
        <FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
      </FacebookShareButton>
      <TwitterShareButton url={currentUrl}>
        <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
      </TwitterShareButton>
      <CopyToClipboard text={currentUrl}>
        <URLShareButton>URL</URLShareButton>
      </CopyToClipboard>
      <KakaoShareButton onClick={handleKakaoButton}>
        <KakaoIcon src={kakaoLogo}></KakaoIcon>
      </KakaoShareButton>
    </GridContainer>
  );
};

export default SocialButtonGroup;
