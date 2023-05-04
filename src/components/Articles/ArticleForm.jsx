import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createArticle, loadCategoriesList, updateArticle } from "../../apis";
import { useAuth } from "../../contexts/AuthContext";
import { MultiSelect } from "../Common";

const ArticleForm = ({ articleDetails }) => {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [options, setOptions] = useState([]);

  const {
    isError,
    isLoading,
    error,
    data: categories,
  } = useQuery(["categories"], loadCategoriesList, {
    onError: (error) => {
      console.log("Error: ", error);
    },
    onSuccess: (data) => {
      console.log("Success: ", data);
      setOptions(
        data.map((category) => ({ value: category.id, label: category.name }))
      );
    },
  });

  const createArticleMutation = useMutation(["createArticle"], createArticle, {
    onSuccess: (data) => {
      console.log("data: ", data);
      // queryClient.invalidateQueries({ queryKey: ["article", data] });
    },
  });

  const updateArticleMutation = useMutation(["updateArticle"], updateArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["edit", "article", params.id],
      });
    },
  });

  const { currentUser } = useAuth();

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        categories: [],
        featured: false,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
        console.log("values: ", values);
        const { title, description, categories, featured } = values;

        if (params.id) {
          const { message, article } = await updateArticleMutation.mutateAsync({
            id: articleDetails.id,
            title,
            description,
            category_ids: categories,
            featured,
          });
          navigate(`/articles/${article.id}`);
        } else {
          const { message, article } = await createArticleMutation.mutateAsync({
            title,
            description,
            category_ids: categories,
            featured,
          });
          navigate(`/articles/${article.id}`);
        }
      }}
    >
      {({ isSubmitting, setFieldValue }) => {
        useEffect(() => {
          if (params.id && articleDetails) {
            console.log("articleDetails: ", articleDetails);
            const fields = ["title", "description", "featured"];
            fields.forEach((field) => {
              setFieldValue(field, articleDetails[field]);
            });
            setFieldValue(
              "categories",
              articleDetails.categories.map((category) => category.id)
            );
          }
        }, []);

        return (
          <Form className="px-3">
            <div className="form-group row mb-3">
              <label
                htmlFor="title"
                className="col-form-label fw-semibold text-muted ps-0"
              >
                Title
              </label>
              <Field
                type="text"
                name="title"
                className="form-control"
                placeholder="Enter title"
                required
              />
              <ErrorMessage name="title" component="div" />
            </div>
            <div className="form-group row mb-3">
              <label
                htmlFor="description"
                className="col-form-label fw-semibold text-muted ps-0"
              >
                Description
              </label>
              <Field
                as="textarea"
                rows="8"
                name="description"
                className="form-control"
                placeholder="Enter description"
                required
              />
              <ErrorMessage name="description" component="div" />
            </div>
            <div className="form-group row mb-3">
              <label
                htmlFor="categories"
                className="col-form-label fw-semibold text-muted ps-0"
              >
                Categories
              </label>
              <Field
                name="categories"
                className="form-control p-0"
                placeholder="Enter categories"
                options={options}
                isMulti={true}
                component={MultiSelect}
              />
              <ErrorMessage name="categories" component="div" />
            </div>

            {currentUser?.admin && (
              <div className="form-group row mb-3">
                <div className="ps-0">
                  <label
                    htmlFor="featured"
                    className="col-form-label fw-semibold text-muted ps-0"
                  >
                    Featured
                  </label>
                  <br />
                  <Field type="radio" name="featured" className="me-1" />
                  Yes
                  <Field type="radio" name="featured" className="ms-3 me-1" />
                  No
                  <ErrorMessage name="featured" component="div" />
                </div>
              </div>
            )}

            <div className="form-group row mb-3 mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ArticleForm;
