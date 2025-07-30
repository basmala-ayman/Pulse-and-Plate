import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUserInfo } from '../../api/UsersAPI';
import { useUser } from '../../UserContext';
import './UserProfile.css';

export default function UserAccount() {
    const token = localStorage.getItem('token');
    const { user: currentUser, setUser } = useUser();

    const formik = useFormik({
        initialValues: {
            name: currentUser.name || '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            oldPassword: Yup.string(),
            newPassword: Yup.string()
                .min(6, 'Must be at least 6 characters')
                .when('oldPassword', {
                    is: (val) => val && val.length > 0,
                    then: (schema) => schema.required('New password is required when old password is provided'),
                }),
            confirmPassword: Yup.string().when('newPassword', {
                is: (val) => val && val.length > 0,
                then: (schema) =>
                    schema
                        .required('Please confirm your new password')
                        .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
            }),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const nameChanged = values.name !== currentUser.name;
                const passwordChanged = values.oldPassword && values.newPassword;

                if (!nameChanged && !passwordChanged) {
                    alert('No changes detected.');
                    setSubmitting(false);
                    resetForm({
                        values: {
                            name: currentUser.name,
                            oldPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                        }
                    });
                    return;
                }

                const payload = {};
                if (nameChanged) payload.name = values.name;
                if (passwordChanged) {
                    payload.password = values.newPassword;
                    payload.oldPassword = values.oldPassword;
                }

                const updated = await updateUserInfo(payload, token);
                alert('User updated successfully!');
                localStorage.setItem('user', JSON.stringify(updated));
                localStorage.setItem('token', updated.token);
                setUser(updated);
                resetForm({
                    values: {
                        name: updated.name,
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    }
                });

            } catch (error) {
                alert(error.message || 'Something went wrong');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="d-flex justify-content-center align-items-center form-container register">
            <div className="bg-white p-5 rounded shadow col-11 col-sm-10 col-md-8 col-lg-6 col-xl-7">
                <h1 className="text-center mb-4">Your Profile</h1>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formEmail">
                        <Form.Label column sm={3}>Email</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="email" value={currentUser.email} readOnly />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="name">
                        <Form.Label column sm={3}>Full Name</Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.name && formik.errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.name}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="oldPassword">
                        <Form.Label column sm={3}>Old Password</Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="password"
                                name="oldPassword"
                                value={formik.values.oldPassword}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="newPassword">
                        <Form.Label column sm={3}>New Password</Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.newPassword && formik.errors.newPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.newPassword}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="confirmPassword">
                        <Form.Label column sm={3}>Confirm New Password</Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.confirmPassword}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 9, offset: 3 }}>
                            <Button type="submit" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? 'Updating...' : 'Update My Info'}
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}
