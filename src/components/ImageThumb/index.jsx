import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

// 图片路径配置（这些图片需要放置在public/images/trips/目录下）
const TRIP_IMAGES = [
  '/images/trips/fd5abecb-2c53-4eea-8628-59e90f878e4a.png',
  '/images/trips/82c397fa-a258-414e-8500-850aca1df17d.png',
  '/images/trips/6deb1b96-6830-444d-9303-7c8c0668b3ac.png',
  '/images/trips/33a6e007-c141-4d1b-b633-0246adfede28.png',
  '/images/trips/845fae43-69d8-4b10-9e7e-dff8927d28b1.png',
  '/images/trips/31121688-d6cb-4443-9fa5-4851ef99e7bb.png',
  '/images/trips/a4b96247-8a6e-404d-ae6b-c00ce9465e1b.png',
  '/images/trips/052fd69e-c3fb-4f46-a8a9-02b0913d7e7b.png',
  '/images/trips/47d54f15-d542-4fe3-801c-18609c261ce3.png',
  '/images/trips/b90327a5-6eef-4c51-b0b5-1224bcf2f74e.png',
  '/images/trips/9fea880f-000d-46c4-8146-f94d9a93f727.png',
  '/images/trips/ded05e67-9817-4c46-b2db-426f773055d9.png',
  '/images/trips/45cd619a-b750-471b-b75f-05c894b28d00.png',
  '/images/trips/5b7b2b91-7787-4e73-8377-7ab684258861.png',
  '/images/trips/76df2b8e-c84c-4e34-ac2c-51fd1f1b7339.png'
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
  
  // 根据size属性确定尺寸 - 所有尺寸都增大了
  const getDimensions = () => {
    switch(size) {
      case 'tiny':
        return { width: 32, height: 32 }; // 原来是24x24
      case 'small':
        return { width: 44, height: 44 }; // 原来是32x32
      case 'medium':
        return { width: 64, height: 64 }; // 原来是48x48
      case 'large':
        return { width: 86, height: 86 }; // 原来是64x64
      default:
        return { width: 64, height: 64 };
    }
  };
  
  // 根据shape属性确定边框圆角 - 稍微增加了圆角值
  const getBorderRadius = () => {
    switch(shape) {
      case 'square':
        return '6px'; // 原来是4px
      case 'rounded':
        return '12px'; // 原来是8px
      case 'circle':
        return '50%';
      default:
        return '12px';
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
        boxShadow: '0 3px 5px rgba(0,0,0,0.15)', // 增强阴影
        backgroundColor: '#f0f8ff',
        position: 'relative',
        margin: '0 4px', // 添加一些边距
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