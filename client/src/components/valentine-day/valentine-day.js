import { useEffect, useState } from 'react';
import $ from 'jquery';
import './valentine-day.scss';
import imggg from './login.jpeg';
import { QRCode, Space } from 'antd/lib';
import Confetti from 'react-confetti';
import c from './athousandyears.mp3';
import PaintingImage from './painting-image';
import Button from '@mui/material/Button';
import { backendUrl } from 'helpers/process_env';

const puzzleCount = 28;

const mp3 = new Audio(c);
mp3.loop = true;

const ValentineDay = () => {
    const [step, setStep] = useState();

    useEffect(() => {
        if (step !== '2') return;

        $(document).ready(function () {
            var box = $('.box'),
                orginal = Array.from({ length: puzzleCount }, (_, index) => index),
                temp = orginal,
                x = [],
                upIMG,
                images = [imggg];
            var img = 0;

            $('.me').css({ 'background-image': 'url(' + images[0] + ')' });

            $('.start').click(function () {
                $('.start').addClass('prevent_click');
                $('.start').delay(100).slideUp(500);
                $('.full').hide();

                Start();
                return 0;
            });

            function Start() {
                randomTile();
                changeBG(img);
                var count = 0,
                    a,
                    b;
                $('.me').click(function () {
                    count++;
                    if (count === 1) {
                        a = $(this).attr('data-bid');
                        $('.me_' + a).css({ opacity: '.65' });
                    } else {
                        b = $(this).attr('data-bid');
                        $('.me_' + a).css({ opacity: '1' });
                        if (a === b) {
                        } else {
                            $('.me_' + a)
                                .addClass('me_' + b)
                                .removeClass('me_' + a);
                            $(this)
                                .addClass('me_' + a)
                                .removeClass('me_' + b);
                            $('.me_' + a).attr('data-bid', a);
                            $('.me_' + b).attr('data-bid', b);
                        }
                        swapping(a, b);
                        checkCorrect(a);
                        checkCorrect(b);
                        a = b = count = 0;
                    }
                    if (arraysEqual(x)) {
                        showScore();
                        $('#confetti').css('display', 'block');
                        return 0;
                    }
                });
                return 0;
            }

            function randomTile() {
                var i;
                for (i = orginal.length - 1; i >= 0; i--) {
                    var flag = getRandom(0, i);
                    x[i] = temp[flag];
                    temp[flag] = temp[i];
                    temp[i] = x[i];
                }
                for (i = 0; i < orginal.length; i++) {
                    box.append('<div  class="me me_' + x[i] + ' tile" data-bid="' + x[i] + '"></div>');
                }
                i = puzzleCount - 1;
                return 0;
            }

            function arraysEqual(arr) {
                var i;
                for (i = orginal.length - 1; i >= 0; i--) {
                    if (arr[i] !== i) return false;
                }
                return true;
            }

            function checkCorrect(N1) {
                var pos = x.indexOf(parseInt(N1, 10));
                if (pos !== +N1) {
                    return;
                }
                $('.me_' + N1).addClass('correct , prevent_click ');
                return;
            }

            function swapping(N1, N2) {
                var first = x.indexOf(parseInt(N1, 10)),
                    second = x.indexOf(parseInt(N2, 10));
                x[first] = parseInt(N2, 10);
                x[second] = parseInt(N1, 10);
                return 0;
            }

            function getRandom(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            function changeBG(img) {
                if (img !== 3) {
                    $('.me').css({
                        'background-image': 'url(' + images[img] + ')',
                    });
                    return;
                } else $('.me').css({ 'background-image': 'url(' + upIMG + ')' });
            }

            function showScore() {
                setTimeout(function () {
                    $('.cover').slideDown(350);
                }, 4000);
                return 0;
            }

            $('#upfile1').click(function () {
                $('#file1').trigger('click');
            });

            $('#file1').change(function () {
                readURL(this);
            });

            function readURL(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        upIMG = e.target.result;
                        img = 3;
                        changeBG(3);
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            }
        });
    }, [step]);

    return (
        <div className='valentine-day'>
            <div id='container'>
                {step === '1' ? (
                    <PaintingImage onFinish={() => setStep('2')} />
                ) : step === '2' ? (
                    <>
                        <button style={{ cursor: 'pointer' }} className='button start'>
                            Puzzle Çözmeye Başla
                        </button>
                        <div className='box'>
                            <div className='me full'></div>
                        </div>
                    </>
                ) : (
                    <Button
                        variant='contained'
                        onClick={() => {
                            setStep('1');
                            mp3.play();
                        }}
                    >
                        Başlamak İçin Tıkla 😉
                    </Button>
                )}
            </div>

            <div className='cover'>
                <div className='score'>
                    BRAVO AŞKIM! ŞİMDİ QR KODU TELEFONUNA OKUT BAKALIM 😉
                    <Space direction='vertical' align='center' style={{ marginTop: '1em' }}>
                        <QRCode color='#0288d1' value={`${backendUrl}/sevgililer-gunu-video`} />
                    </Space>
                </div>
            </div>
            <Confetti id='confetti' style={{ display: 'none' }} width={window.innerWidth} height={window.innerHeight} />
        </div>
    );
};

export default ValentineDay;
