import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface Props {
  parentRef: any;
  childRef: React.RefObject<HTMLElement>;
  isShow: boolean;
}

type Point = { x: number; y: number };

const calculateExcludedClipPath = (rectRect: DOMRect, arrowRect: DOMRect) => {
  /**
   * leftTop - left, top
   * rightTop - right, top
   * leftBottom - left, bottom
   * rightBottom - right, bottom
   */
  const left = Math.max(rectRect.left, arrowRect.left);
  const right = Math.min(rectRect.right, arrowRect.right);
  const top = Math.max(rectRect.top, arrowRect.top);
  const bottom = Math.min(rectRect.bottom, arrowRect.bottom);

  if (left < right && top < bottom) {
    // 겹치는 부분이 존재할 경우 클립 경로 업데이트
    const clipPathPolygon = [
      { x: rectRect.left, y: rectRect.top },
      { x: right, y: rectRect.top },
      { x: right, y: bottom },
      { x: rectRect.left, y: bottom },
    ];

    const arrowPoints = calculateArrowPoints(arrowRect);

    // 화살표의 일부가 사각형과 겹치면 해당 부분 제외
    const excludedPolygon = excludeArrowFromPolygon(
      clipPathPolygon,
      arrowPoints
    );

    // 최종 클립 경로 설정
    return `polygon(${excludedPolygon
      .map((point) => `${point.x}px ${point.y}px`)
      .join(",")})`;
  }

  // 겹치는 부분이 없을 경우 클립 경로 초기화
  return "none";
};

const calculateArrowPoints = (arrowRect: DOMRect) => {
  // 화살표의 꼭짓점을 계산
  // 간단한 예시로 좌측 하단, 중앙 하단, 우측 하단의 3개의 점을 사용
  const leftBottom = { x: arrowRect.left, y: arrowRect.bottom };
  const centerBottom = {
    x: (arrowRect.left + arrowRect.right) / 2,
    y: arrowRect.bottom,
  };
  const rightBottom = { x: arrowRect.right, y: arrowRect.bottom };

  return [leftBottom, centerBottom, rightBottom];
};

const excludeArrowFromPolygon = (polygon: Point[], arrowPoints: Point[]) => {
  // 화살표와 겹치는 부분을 제외
  // 간단한 예시로 화살표의 좌측 하단과 우측 하단의 선분을 사용
  const excludedPolygon = polygon.filter((point) => {
    const isInsideArrow = isPointInsideArrow(point, arrowPoints);
    return !isInsideArrow;
  });

  return excludedPolygon;
};

const isPointInsideArrow = (point: Point, arrowPoints: Point[]) => {
  // 점이 화살표 내부에 있는지 확인
  // 간단한 예시로 선분의 외적을 이용하여 확인
  const [pointX, pointY] = [point.x, point.y];
  const [start, end] = arrowPoints;

  const crossProduct =
    (pointX - start.x) * (end.y - start.y) -
    (pointY - start.y) * (end.x - start.x);

  return crossProduct > 0;
};

const useOverlappingElements = ({ parentRef, childRef, isShow }: Props) => {
  const [clipPath, setClipPath] = useState("none");

  useEffect(() => {
    const updateClipPath = () => {
      if (!parentRef?.current || !childRef?.current) return;
      const parentRect = parentRef.current.getBoundingClientRect();
      const childRect = childRef?.current?.getBoundingClientRect();

      if (!parentRect || !childRect) return;

      // 클립 경로 계산
      const excludedClipPath = calculateExcludedClipPath(parentRect, childRect);

      setClipPath(excludedClipPath);
    };

    updateClipPath(); // 초기 클립 경로 설정
  }, [isShow]);

  useEffect(() => {
    console.log("use overlapping clipPath", clipPath);
  }, [clipPath]);

  return {
    clipPath,
  };
};

export default useOverlappingElements;
