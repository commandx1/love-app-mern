import { DatePicker } from 'antd/lib';
import Input from 'components/common/input/input';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import 'dayjs/locale/tr';
import locale from 'antd/es/date-picker/locale/tr_TR';

const { TextArea } = Input;

const FormElements = ({ Form }) => {
    const location = useLocation();

    const formItems = useMemo(() => {
        if (location.pathname === '/ceyiz') {
            return [
                {
                    name: 'title',
                    label: 'Ürün Başlığı',
                    rules: [{ required: true, message: 'Lütfen eşya adını giriniz.' }],
                    component: <Input placeholder='Örn: Çift kişilik yatak...' />,
                },
                {
                    name: 'description',
                    label: 'Açıklama',
                    component: <Input placeholder='Bu eşyanın anlam ve önemini anlatan birkaç cümle...' />,
                },
                {
                    name: 'more_description',
                    label: 'Ek Bilgiler',
                    component: <TextArea placeholder='Bu eşyayla ilgili tüm düşünceleriniz...' />,
                },
            ];
        }

        if (location.pathname === '/siir') {
            return [
                {
                    name: 'title',
                    label: 'Şiir Başlığı',
                    rules: [{ required: true, message: 'Lütfen şiir başlığı giriniz.' }],
                    component: <Input placeholder='Örn: Göğe Bakma Durağı' />,
                },
                {
                    name: 'content',
                    label: 'Şiir İçeriği',
                    component: <TextArea placeholder='İkimiz birden sevinebiliriz göğe bakalım...' />,
                },
            ];
        }

        return [
            {
                name: 'title',
                label: 'Anı Başlığı',
                rules: [{ required: true, message: 'Lütfen anıya başlık giriniz.' }],
                component: <Input placeholder='Başlık' />,
            },
            {
                name: 'content',
                label: 'İçerik',
                component: <TextArea placeholder='Anınızı buraya yazabilirsiniz' />,
            },
            {
                name: 'date',
                label: 'Tarih',
                component: (
                    <DatePicker locale={locale} style={{ width: '100%' }} placeholder='Tarih seç' format='DD/MM/YYYY' />
                ),
            },
        ];
    }, [location.pathname]);

    return formItems.map(({ name, label, component, rules }) => (
        <Form.Item key={name} name={name} label={label} rules={rules}>
            {component}
        </Form.Item>
    ));
};

export default FormElements;
