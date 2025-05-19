import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from '@react-native-masked-view/masked-view';

const CommentIcon = ({
}) => {
    return (
        <MaskedView maskElement={<Svg 
                    // xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="none"
                >
                    <Path
                    fill="#000"
                    d="M9.962 20a9.879 9.879 0 0 1-4.8-1.21.242.242 0 0 0-.186 0l-3.284.93a1.153 1.153 0 0 1-1.45-1.441l.985-3.302a.251.251 0 0 0 0-.177 10 10 0 1 1 10.875 4.976c-.704.147-1.421.222-2.14.224Zm-4.92-2.67c.275.004.547.074.79.205A8.604 8.604 0 1 0 8.53 1.507a8.586 8.586 0 0 0-6.103 12.632 1.646 1.646 0 0 1 .14 1.256l-.865 2.875 2.874-.866a1.61 1.61 0 0 1 .465-.074Z"
                    />
                </Svg>
            
        }>
            <LinearGradient
                start={{x:0.5, y:0}}
                end={{x:0.5, y:1}}
                colors={["#FFC166", "#FF9966"]}>
                <Svg 
                    // xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="none"
                    style={{opacity:0}}
                >
                    <Path
                    fill="#000"
                    d="M9.962 20a9.879 9.879 0 0 1-4.8-1.21.242.242 0 0 0-.186 0l-3.284.93a1.153 1.153 0 0 1-1.45-1.441l.985-3.302a.251.251 0 0 0 0-.177 10 10 0 1 1 10.875 4.976c-.704.147-1.421.222-2.14.224Zm-4.92-2.67c.275.004.547.074.79.205A8.604 8.604 0 1 0 8.53 1.507a8.586 8.586 0 0 0-6.103 12.632 1.646 1.646 0 0 1 .14 1.256l-.865 2.875 2.874-.866a1.61 1.61 0 0 1 .465-.074Z"
                    />
                </Svg>
            </LinearGradient>
        </MaskedView>
    );
};



export default CommentIcon;
