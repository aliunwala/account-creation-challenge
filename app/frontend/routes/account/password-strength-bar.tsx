import React, { CSSProperties, Fragment, useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';

// See: https://www.npmjs.com/package/react-password-strength-bar for similar implementation (As for this take home exam we were told not to use external components)

export interface PasswordStrengthBarProps {
  className?: string;
  // style?: CSSProperties;
  // scoreWordClassName?: string;
  // scoreWordStyle?: CSSProperties;
  pw: string;
  // userInputs?: string[];
  // barColors?: string[];
  // scoreWords?: ReactNode[];
  // minLength?: number;
  // shortScoreWord?: ReactNode;
  // onChangeScore?: (
  //   score: PasswordStrengthBarState['score'],
  //   feedback: PasswordFeedback,
  // ) => void;
}

export default function PasswordStrengthBar({ pw, className }: PasswordStrengthBarProps) {
  const barColors = ['#ddd', '#ef4836', '#f6b44d', '#2b90ef', '#25c281'];
  const scoreWords = ['weak', 'weak', 'okay', 'good', 'strong'];
  const spaceStyle: CSSProperties = {
    width: 4,
  };
  const [pwScore, setPwScore] = useState(0);
  useEffect(() => {
    const pwScoreRes = zxcvbn(pw).score;
    setPwScore(pwScoreRes);
  }, [pw]);

  const minLength = 20;

  let newShortScoreWord = '';
  if (pw.length >= 1) {
    newShortScoreWord = pw.length >= minLength ? scoreWords[pwScore] : 'too short';
  }

  const descStyle: CSSProperties = {
    margin: '5px 0 0',
    color: '#898792',
    fontSize: 14,
    textAlign: 'right',
    minHeight: '20px',
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-center">
        {[1, 2, 3, 4].map((el: number) => (
          <Fragment key={`password-strength-bar-item-${el}`}>
            {el > 1 && <div style={spaceStyle} />}
            <Item score={pwScore} itemNum={el} barColors={barColors} />
          </Fragment>
        ))}
      </div>
      <p style={descStyle}>{newShortScoreWord}</p>
    </div>
  );
}
interface PasswordStrengthBarItemProps {
  score: number;
  itemNum: number;
  barColors: string[];
}

export function Item({ score, itemNum, barColors }: PasswordStrengthBarItemProps) {
  let bgColor = barColors[0];
  if (score >= itemNum) {
    bgColor = barColors[score];
  }
  const itemStyle: CSSProperties = {
    flexBasis: 0,
    flexGrow: 1,
    position: 'relative',
    maxWidth: '100%',
    width: '100%',
    height: 2,
  };

  return (
    <div
      style={{
        ...itemStyle,
        backgroundColor: bgColor,
      }}
    />
  );
}
