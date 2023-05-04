import SuccessImg from '@/public/success.png'
import FailImg from '@/public/fail.png'
import ShockImg from '@/public/shock.png'

export default function getModalType(type: any = 'success') {
    const details  = {
        'success' : {
            message: 'succes',
            emoji : SuccessImg
        },
        'fail':{
            message:'failed',
            emoji : FailImg
        },
        'shock' : {
            message:'already word is there',
            emoji: ShockImg
        }
    }
    return details[type]
}