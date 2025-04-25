import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

// 图片路径配置（这些图片需要放置在public/images/trips/目录下）
const TRIP_IMAGES = [
  '/images/trips/fd5abecb-2c53-4eea-8628-59e90f878e4a.png',
  '/images/trips/82c397fa-a258-414e-8500-850aca1df17d.png',
  '/images/trips/6deb1b96-6830-444d-9303-7c8c0668b3ac.png',
];

/**
 * 随机选择一张图片
 * @returns {string} 随机图片路径
 */
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * TRIP_IMAGES.length);
  return TRIP_IMAGES[randomIndex];
};

/**
 * 图片缩略图组件，带有主题蓝色边框
 * @param {Object} props - 组件属性
 * @param {string} props.size - 图片尺寸 (small, medium, large)
 * @param {string} props.shape - 图片形状 (square, rounded, circle)
 * @param {number} props.borderWidth - 边框宽度（默认2px）
 */
const ImageThumb = ({ size = 'medium', shape = 'rounded', borderWidth = 2 }) => {
  const [imageSrc, setImageSrc] = useState('');
  
  useEffect(() => {
    // 组件挂载时随机选择一张图片
    setImageSrc(getRandomImage());
  }, []);
  
  // 根据size属性确定尺寸
  const getDimensions = () => {
    switch(size) {
      case 'tiny':
        return { width: 24, height: 24 };
      case 'small':
        return { width: 32, height: 32 };
      case 'medium':
        return { width: 48, height: 48 };
      case 'large':
        return { width: 64, height: 64 };
      default:
        return { width: 48, height: 48 };
    }
  };
  
  // 根据shape属性确定边框圆角
  const getBorderRadius = () => {
    switch(shape) {
      case 'square':
        return '4px';
      case 'rounded':
        return '8px';
      case 'circle':
        return '50%';
      default:
        return '8px';
    }
  };
  
  const { width, height } = getDimensions();
  
  return (
    <Box
      sx={{
        width,
        height,
        borderRadius: getBorderRadius(),
        overflow: 'hidden',
        border: `${borderWidth}px solid #1976d2`, // 主题蓝色边框
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#f0f8ff',
        position: 'relative',
      }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Trip thumbnail"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
    </Box>
  );
};

export default ImageThumb; 