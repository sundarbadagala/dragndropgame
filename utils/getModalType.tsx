import SuccessImg from '@/public/success.png'
import FailImg from '@/public/fail.png'
import ShockImg from '@/public/shock.png'

export default function getModalType(type: any = 'success') {
    const details  = {
        'success' : {
            message: 'excellent',
            emoji : SuccessImg
        },
        'fail':{
            message:'wasted',
            emoji : FailImg
        },
        'shock' : {
            message:'already is there',
            emoji: ShockImg
        }
    }
    return details[type]
}