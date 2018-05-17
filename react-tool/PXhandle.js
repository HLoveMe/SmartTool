
/**
 * 屏幕工具类
 * ui设计基准,iphone 6
 * width:750
 * height:1334
 */
import {Dimensions, PixelRatio} from 'react-native'
const {screenW,screenH} = Dimensions.get("window");
const fontScale = PixelRatio.getFontScale();
export let pixelRatio = PixelRatio.get();
//像素密度
export const DEFAULT_DENSITY = 2;
//px转换成dp
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的750和1334为对应尺寸即可.
const w2 = 750 / DEFAULT_DENSITY;
//px转换成dp
const h2 = 1334 / DEFAULT_DENSITY;

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

export  default class PXhandle{
    static ScreenWidth = screenW;
    static ScreenHeight = screenH;
    static scaleSize = (size)=>{
        let scaleWidth = screenW / w2;
        let scaleHeight = screenH / h2;
        let scale = Math.min(scaleWidth, scaleHeight);
        size = Math.round((size * scale + 0.5));
        return size / DEFAULT_DENSITY;
    };
    static PXWidth = (px)=>{
        return PXhandle.scaleSize(px)
    };
    static PXHeight = (px)=>{
        // console.log("",px,px * PXhandle.ScreenHeight / 667 * 2 / scale,scaleSize(px))
        return PXhandle.scaleSize(px)
    }
    static PXFontSize = (size)=>{
        let scaleWidth = screenW / w2;
        let scaleHeight = screenH / h2;
        let scale = Math.min(scaleWidth, scaleHeight);
        size = Math.round((size * scale + 0.5));
        return size / DEFAULT_DENSITY;
    }
}